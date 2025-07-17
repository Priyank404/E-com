import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import axios from 'axios'

const ProductForm = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('No file chosen');

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    // 1. Append all form values to FormData
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('discount', values.discount);
    formData.append('bgColor', values.bgColor);
    formData.append('panelColor', values.panelColor);
    formData.append('textColor', values.textColor);
    formData.append('image', values.image); // this is the file (image)

     try {
      // 2. Send data to backend
      const response = await axios.post('http://localhost:3000/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
     
      
      navigate('/owner', {
        state: { message: 'Product created successfully!' },
      })
     
    } catch (error) {
      
      console.log('Upload error:', error)
    }

    
    setSubmitting(false);
    console.log(formData);


   
  };


  return (
    <div className='w-1/2 bg-white tracking-tight '>
      <Formik
        initialValues={{
          name: '',
          price: '',
          discount: '',
          bgColor: '',
          panelColor: '',
          textColor: '',
          image: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className='flex flex-col gap-8'>

            {/* ✅ Product Details */}
            <div>
              <h2 className='text-2xl font-semibold mb-4'>Product Details</h2>

                <div className='flex items-center gap-4 mb-4'>
                    <label className='font-medium text-md'>Product Image</label>
                    <label className='bg-blue-500 text-white text-sm px-4 py-1 rounded-full cursor-pointer hover:bg-blue-600'>
                        Select File
                        <input
                        type='file'
                        name='image'
                        accept='image/*'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue('image', file);
                            setFileName(file ? file.name : 'No file chosen');
                        }}
                        className='hidden'
                        />
                    </label>

                    {/* ✅ Show file name here */}
                    <span className='text-sm text-gray-700 truncate max-w-[200px]'>
                        {fileName !== 'No file chosen' ? fileName : ''}
                    </span>
                </div>


              <div className='flex flex-col gap-4'>
                <Field
                  name='name'
                  placeholder='Product Name'
                  className='bg-gray-100 px-3 py-2 rounded text-sm outline-none'
                />

                <div className='flex gap-4'>
                  <Field
                    name='price'
                    placeholder='Product Price'
                    type='number'
                    className='bg-gray-100 w-1/2 px-3 py-2 rounded text-sm outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  />
                  <Field
                    name='discount'
                    placeholder='Discount Price'
                    type='number'
                    className='bg-gray-100 w-1/2 px-3 py-2 rounded text-sm outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  />
                </div>
              </div>
            </div>

            {/* ✅ Panel Details */}
            <div>
              <h2 className='text-2xl font-semibold mb-4'>Panel Details</h2>

              <div className='flex gap-4 mb-4'>
                <Field
                  name='bgColor'
                  placeholder='Background Color'
                  className='bg-gray-100 w-1/2 px-3 py-2 rounded text-sm outline-none'
                />
                <Field
                  name='panelColor'
                  placeholder='Panel Color'
                  className='bg-gray-100 w-1/2 px-3 py-2 rounded text-sm outline-none'
                />
              </div>

              <Field
                name='textColor'
                placeholder='Text Color'
                className='bg-gray-100 w-full px-3 py-2 rounded text-sm outline-none'
              />
            </div>

            {/* ✅ Submit Button */}
            <button
              type='submit'
              className='self-start bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;
