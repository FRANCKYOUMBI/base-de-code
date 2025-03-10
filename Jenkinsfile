pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
         stage('Clone repository') { 
            steps { 
                script{
                    slackSend(message: "${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nBuild commencé", channel: "pos")
                    echo 'Pulling...' + env.BRANCH_NAME
                    checkout scm
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Test...'
//                     sh 'yarn install'
//                     sh 'yarn test'
                }
            }
        }

        stage('Build') { 
            steps { 
                sh 'printenv'
                script{
                    def dockerfile = 'Dockerfile'
                    if (env.BRANCH_NAME == 'master') {
                        app = docker.build("registry.gitlab.com/kevmaxsarl/pos/api:latest", "-f ${dockerfile} ./")
                    } else {
                        app = docker.build("registry.gitlab.com/kevmaxsarl/pos/api:"+env.BRANCH_NAME, "-f ${dockerfile} ./")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script{
                    docker.withRegistry('https://registry.gitlab.com/kevmaxsarl/pos/api', 'gitlab_username_password') {
                        //app.push("${env.BUILD_NUMBER}")
                        if (env.BRANCH_NAME == 'master') {
                            app.push("latest")
                        } else {
                            app.push(env.BRANCH_NAME)
                        }
                    }
                }
            }
        }
    }
        
    post {
        success {
            slackSend(color: "good", message: "${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nBuild effectué avec succès", channel: "pos")
        }
        failure {
            slackSend(failOnError:true, message:"${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)\nÉchec de build", channel: "pos")
        }
    }
}
