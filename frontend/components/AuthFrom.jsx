import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik,Field, Form } from 'formik';
import axios from 'axios';

const AuthFrom = ({type}) => {

    const navigate = useNavigate();
    
    const isRegister = type === 'Register';
    const initialValues = isRegister ? { fullname: '', email: '', password: '' }: { email: '', password: '' };

    const handleSubmit = async( values, {setSubmitting}) => {
        if(isRegister) {
            try {
                const response = await axios.post('http://localhost:3000/users/create', values,{
                    withCredentials: true
                });
                navigate('/shop', { state: { message: 'Account created successfully!' } });
            } catch (error) {
                console.log({ error });;
            }
            setSubmitting(false);
        }else{
            try {
                const res = await axios.post('http://localhost:3000/users/login', values,{
                    withCredentials: true
                });
                if(res.data.success){
                    localStorage.setItem('role', res.data.role);

                    if(res.data.role === 'owner'){
                        navigate('/owner', { state: { message: 'Login successful!' } });
                    }else{
                        navigate('/shop', { state: { message: 'Login successful!' } });
                    }

                }else{
                    alert(res.data.message||'Login failed');
                }
            } catch (error) {
                console.log({ error });;
            }
            setSubmitting(false);
        }
    }
  return (
    <>
        <Formik
            initialValues={initialValues} onSubmit={handleSubmit}
        >
            <Form className="flex flex-col gap-4">

                {/* check if its isregister if yes then only add fullname field */}
                {isRegister && (
                <Field
                name="fullname"
                type="text"
                className={`${isRegister? 'bg-white': 'bg-gray-100'}  py-2 px-4 rounded-md w-full outline-none`}
                placeholder="Full Name"
                />)}


                <Field
                name="email"
                type="email"
                className={`${isRegister? 'bg-white': 'bg-gray-100'}  py-2 px-4 rounded-md w-full outline-none`}
                placeholder="Email"
                />


                <Field
                name="password"
                type="password"
                className={`${isRegister? 'bg-white': 'bg-gray-100'}  py-2 px-4 rounded-md w-full outline-none`}
                placeholder="Password"
                />

                
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md w-fit px-6"
                >
                {isRegister? 'Create My Account' : 'Login'}
                </button>



                
            </Form>
        </Formik>
    </>
  )
}

export default AuthFrom