import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import registerValidationSchema from '../validations/registerSchema.validation';
import Input from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from "react-redux";
import { registerByPayload } from '@/features/authentication/redux/authenticationSlice'
import { AnyAction } from 'redux'
import { FormRegisterInputs } from '@/types/global';
import { useMessage } from '@/context/MessageContext';


const RegistrationForm = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<FormRegisterInputs>({
          resolver: yupResolver(registerValidationSchema),
          defaultValues: {
               firstName: '',
               lastName: '',
               email: '',
               password: '',
               confirmPassword: '',
          },
          mode: 'onBlur',
          reValidateMode: 'onChange',
     });

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const onSubmitRegister = (data: FormRegisterInputs) => {
          dispatch(registerByPayload(data))
     }



     return (
          <form onSubmit={handleSubmit(onSubmitRegister)} >
               <h2 className="text-2xl lg:text-3xl text-center my-10">
                    <span className="font-bold">Sign</span> Up
               </h2>
               <Input id='firstName' type="text" placeholder="First Name" register={{ ...register('firstName') }} />
               {errors.firstName && <span className='mx-5'>{errors.firstName.message}</span>}
               <Input id='lastName' type="text" placeholder="Last Name" register={{ ...register('lastName') }} />
               {errors.lastName && <span className='mx-5'>{errors.lastName.message}</span>}
               <Input id='email' type="email" placeholder="Email" register={{ ...register('email') }} />
               {errors.email && <span className='mx-5'>{errors.email.message}</span>}
               <Input id='password' type="password" placeholder="Password" register={{ ...register('password') }} />
               {errors.password && <span className='mx-5'>{errors.password.message}</span>}
               <Input id='confirmPassword' type="password" placeholder="Password Again" register={{ ...register('confirmPassword') }} />
               {errors.confirmPassword && <span className='mx-5'>{errors.confirmPassword.message}</span>}

               <Button type="submit" label=" Sign Up " />
          </form>
     );
};

RegistrationForm.displayName = 'RegistrationForm';

export default RegistrationForm;
