import Button from '@/components/Button'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

interface ContactForm {
  name: string
  email: string
  phone: string
  budget: string
  message: string
}

const Contact: FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    try {
      // Implémentez votre logique d'envoi de formulaire ici
      console.log(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <section className="py-20">
      <div className="container max-w-[1220px] mx-auto px-4 2xl:px-0">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                {...register('name', { required: true })}
                placeholder="Your Name*"
                className="w-full p-3 border rounded-md"
              />
              {errors.name && <span className="text-red-500">This field is required</span>}
            </div>
            
            <div>
              <input
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                placeholder="Your Email*"
                className="w-full p-3 border rounded-md"
              />
              {errors.email && <span className="text-red-500">Please enter a valid email</span>}
            </div>

            <div>
              <input
                type="tel"
                {...register('phone', { required: true })}
                placeholder="Phone Number*"
                className="w-full p-3 border rounded-md"
              />
              {errors.phone && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <select
                {...register('budget')}
                className="w-full p-3 border rounded-md"
                defaultValue=""
              >
                <option value="" disabled>Set your budget</option>
                <option value="small">Less than $5,000</option>
                <option value="medium">$5,000 - $10,000</option>
                <option value="large">More than $10,000</option>
              </select>
            </div>

            <div>
              <textarea
                {...register('message', { required: true })}
                placeholder="Your Message*"
                rows={8}
                className="w-full p-3 border rounded-md resize-none"
              />
              {errors.message && <span className="text-red-500">This field is required</span>}
            </div>

            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact 