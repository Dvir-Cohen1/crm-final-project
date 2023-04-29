import Input from '@/components/common/Input'
import React from 'react'
import { isUserCanEdit } from '../../utils/user.utils'
import { Button } from '@/components/common/Button'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useDispatch } from 'react-redux'
import { AddUserRegisterInputs } from '@/types/global'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import newUserSchemaValidation from '../../validations/newUserSchema.validation'
import { editUser } from '../../redux/userSlice'

const EditUserForm = ({ user, loggedUser }: any) => {



     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<AddUserRegisterInputs>({
          // resolver: yupResolver(newUserSchemaValidation),
          defaultValues: {
               firstName: '',
               lastName: '',
               email: '',
               phoneNumber: '',
               role: 'Member',
          },
          mode: 'onBlur',
          reValidateMode: 'onChange',
     });

     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const onSubmitEditUser = (data: any) => {
          console.log(data)
          dispatch(editUser({ data:data, userId: user?._id }))
     }

     return (
          <form onSubmit={handleSubmit(onSubmitEditUser)}>
               <Input showLabel disabled type='text' label='ID' placeholder={user?._id} />

               <Input register={{ ...register('firstName') }} showLabel disabled={!isUserCanEdit(user, loggedUser)} type='text' label='First Name' placeholder={user?.firstName} />

               {errors.firstName && <span className='mx-5'>{errors.firstName.message}</span>}

               <Input register={{ ...register('lastName') }} showLabel disabled={!isUserCanEdit(user, loggedUser)} type='text' label='Last Name' placeholder={user?.lastName} />

               {errors.lastName && <span className='mx-5'>{errors.lastName.message}</span>}

               <Input register={{ ...register('email') }} showLabel disabled={!isUserCanEdit(user, loggedUser)} type='email' label='Email' placeholder={user?.email} />

               {errors.email && <span className='mx-5'>{errors.email.message}</span>}

               <Input register={{ ...register('phoneNumber') }} showLabel disabled={!isUserCanEdit(user, loggedUser)} type='number' label='Phone Number' placeholder={user?.phoneNumber?.toString() || ""} />

               {errors.phoneNumber && <span className='mx-5'>{errors.phoneNumber.message}</span>}

               <Input register={{ ...register('role') }} showLabel disabled={loggedUser?.role !== "admin"} type='text' label='Role' placeholder={user?.role} />

               {errors.role && <span className='mx-5'>{errors.role.message}</span>}
               
               {isUserCanEdit(user, loggedUser) &&
                    <Button type='submit' className='w-32' fontSize='sm' variant='secondary'>Save Changes</Button>
               }
          </form>
     )
}

export default EditUserForm