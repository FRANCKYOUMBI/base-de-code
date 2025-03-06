#!/usr/bin/env bash

##
## Set some variables
##

LOG='/var/log/borg/backup.log'

export BACKUP_USER='u418075'
export REPOSITORY_DIR='pkf_production'
export BORG_PASSPHRASE='bVSUm!3vdx5et^2%BTuV'

export REPOSITORY="ssh://${BACKUP_USER}@${BACKUP_USER}.your-storagebox.de:23/./backups/${REPOSITORY_DIR}"

##
## Output to a logfile
##

exec > >(tee -i ${LOG})
exec 2>&1

echo "###### Backup started: $(date) ######"

echo "Zip devops folder ..."

export BACKUP_ZIP_NAME="$(date +%Y-%m-%d_%H:%M).zip"

echo "Backup file name: $BACKUP_ZIP_NAME"

zip -r /home/swarm/$BACKUP_ZIP_NAME /home/swarm/devops

echo "Transfer files ..."
borg create $REPOSITORY::$BACKUP_ZIP_NAME /home/swarm/$BACKUP_ZIP_NAME

echo "###### Backup ended: $(date) ######"