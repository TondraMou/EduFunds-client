import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { imageUpload, saveUser } from '../../api/utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()

  // Form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    // Debugging log for form data
    console.log('Form Data:', { name, email, password, image });

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/
    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 6 characters long, contain a capital letter, and a special character.')
      return
    }

    try {
      // Send image data to an image hosting service (like imgbb)
      const photoURL = await imageUpload(image)

      // User registration process
      const result = await createUser(email, password)

      // Update user profile with name and photo URL
      await updateUserProfile(name, photoURL)

      // Save user data to the database (MongoDB, etc.)
      await saveUser({ ...result?.user, displayName: name, photoURL })

      // Navigate to home page after successful signup
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.error(err)

      // Firebase error handling
      if (err?.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please choose a stronger password.')
      } else if (err?.code === 'auth/email-already-in-use') {
        toast.error('Email is already in use. Please use a different email.')
      } else {
        toast.error(err?.message || 'Something went wrong!')
      }
    }
  }

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle()
      await saveUser(data?.user)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Google Sign-In failed')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to EduFunds</p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            {/* Name Input */}
            <div>
              <label htmlFor='name' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className='w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 text-gray-900'
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
            </div>

            {/* Password Input */}
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>

        {/* Social SignUp Section */}
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>

        {/* Google SignIn Button */}
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Login Link */}
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp