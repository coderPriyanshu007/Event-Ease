import React from 'react';
import { useState } from 'react';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = ({  updateJob }) => {
    const job = useLoaderData();
    const navigate = useNavigate();
    const { id } = useParams();

    const [jobValues, setJobValues] = useState({
       
        type: job.type,
        title: job.title,
        description: job.description,
        salary: job.salary,
        location: job.location,
        company: job.company.name,
        company_description: job.company.description,
        contact_email: job.company.contactEmail,
        contact_phone: job.company.contactPhone
    })


    const changeHandler = (e) => {
        const { name, value } = e.target;
        setJobValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }));

    }

    const submitForm = (e) => {
        e.preventDefault();
        const updatedjob = {
            id,
            title: jobValues.title,
            type: jobValues.type,
            location: jobValues.location,
            description:jobValues.description,
            salary: jobValues.salary,
            company:{
                name:jobValues.company,
                description: jobValues.company_description,
                contactEmail : jobValues.contact_email,
                contactPhone : jobValues.contact_phone
            }
        }
        
       updateJob(updatedjob);
       toast.success('Updated Successfully');
      navigate(`/jobs/${id}`)
       

    }
    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitForm}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Edit Job</h2>

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                            >Job Type</label>
                            <select
                                id="type"
                                name="type"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={jobValues.type}
                                onChange={changeHandler}

                            >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2"
                            >Job Listing Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="eg. Beautiful Apartment In Miami"
                                required
                                value={jobValues.title}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="block text-gray-700 font-bold mb-2"
                            >Description</label>

                            <textarea
                                id="description"
                                name="description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                value={jobValues.description}
                                onChange={changeHandler}
                                placeholder="Add any job duties, expectations, requirements, etc"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                            >Salary</label>

                            <select
                                id="salary"
                                name="salary"
                                className="border rounded w-full py-2 px-3"
                                required
                                value={jobValues.salary}
                                onChange={changeHandler}
                            >
                                <option disabled value={jobValues.salary}>{jobValues.salary}</option>
                                <option value="Under $50K">Under $50K</option>
                                <option value="$50K - 60K">$50K - $60K</option>
                                <option value="$60K - 70K">$60K - $70K</option>
                                <option value="$70K - 80K">$70K - $80K</option>
                                <option value="$80K - 90K">$80K - $90K</option>
                                <option value="$90K - 100K">$90K - $100K</option>
                                <option value="$100K - 125K">$100K - $125K</option>
                                <option value="$125K - 150K">$125K - $150K</option>
                                <option value="$150K - 175K">$150K - $175K</option>
                                <option value="$175K - 200K">$175K - $200K</option>
                                <option value="Over $200K">Over $200K</option>
                            </select>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                                Location
                            </label>
                            <input
                                type='text'
                                id='location'
                                name='location'
                                className='border rounded w-full py-2 px-3 mb-2'
                                placeholder='Company Location'
                                required
                                value={jobValues.location}
                                onChange={changeHandler}
                            />
                        </div>

                        <h3 className="text-2xl mb-5">Company Info</h3>

                        <div className="mb-4">
                            <label htmlFor="company" className="block text-gray-700 font-bold mb-2"
                            >Company Name</label>

                            <input
                                type="text"
                                id="company"
                                name="company"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Company Name"
                                value={jobValues.company}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="company_description"
                                className="block text-gray-700 font-bold mb-2"
                            >Company Description</label>

                            <textarea
                                id="company_description"
                                name="company_description"
                                className="border rounded w-full py-2 px-3"
                                rows="4"
                                placeholder="What does your company do?"
                                value={jobValues.company_description}
                                onChange={changeHandler}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="contact_email"
                                className="block text-gray-700 font-bold mb-2"
                            >Contact Email</label>

                            <input
                                type="email"
                                id="contact_email"
                                name="contact_email"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Email address for applicants"
                                required
                                value={jobValues.contact_email}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="contact_phone"
                                className="block text-gray-700 font-bold mb-2"
                            >Contact Phone</label>

                            <input
                                type="tel"
                                id="contact_phone"
                                name="contact_phone"
                                className="border rounded w-full py-2 px-3"
                                placeholder="Optional phone for applicants"
                                value={jobValues.contact_phone}
                                onChange={changeHandler}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditJobPage
