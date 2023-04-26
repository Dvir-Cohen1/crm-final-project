import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AddUserRegisterInputs } from '@/types/global';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import Input from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { addUser } from '../../redux/userSlice';
import newUserSchemaValidation from '../../validations/newUserSchema.validation';
const NewUserForm = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<AddUserRegisterInputs>({
          resolver: yupResolver(newUserSchemaValidation),
          defaultValues: {
               firstName: '',
               lastName: '',
               email: '',
               password: '',
               phoneNumber: '',
               role: [],
          },
          mode: 'onBlur',
          reValidateMode: 'onChange',
     });

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const onSubmitAddUser = (data: AddUserRegisterInputs) => {
          dispatch(addUser(data))
     }

     return (
          <>
               <form className='w-1/2' onSubmit={handleSubmit(onSubmitAddUser)}>
                    <div className='text-3xl font-semibold text-left'>New User</div>
                    <Input register={{ ...register('firstName') }} required type='text' placeholder={'First Name'} />
                    {errors.firstName && <span className='mx-5'>{errors.firstName.message}</span>}
                    <Input register={{ ...register('lastName') }} required type='text' placeholder={'Last Name'} />
                    {errors.lastName && <span className='mx-5'>{errors.lastName.message}</span>}
                    <Input register={{ ...register('email') }} required type='email' placeholder={'Email'} />
                    {errors.email && <span className='mx-5'>{errors.email.message}</span>}
                    <Input register={{ ...register('password') }} required type='password' placeholder={'Password'} />
                    {errors.password && <span className='mx-5'>{errors.password.message}</span>}
                    <Input register={{ ...register('phoneNumber') }} type='number' placeholder={'Phone Number'} />
                    {errors.phoneNumber && <span className='mx-5'>{errors.phoneNumber.message}</span>}
                    <Input register={{ ...register('role') }} type='select' placeholder={'Role'} />
                    {errors.role && <span className='mx-5'>{errors.role.message}</span>}
                    <Button type="submit" label='Create User'/>
               </form>
          </>
     )
}

export default NewUserForm