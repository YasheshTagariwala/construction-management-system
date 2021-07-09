import React, {useState} from "react";
import poster from '../assets/images/macbook.png';

const carousals: any = [
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    },
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    },
    {
        title: 'Welcome to C360 Labs',
        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur fugit ' +
            'eaque dolores, rerum reiciendis atque. Voluptatibus eaque quaerat, adipisci' +
            ' tempore ex in sunt et similique laborum eveniet quia! Voluptate, quo?',
        image: poster
    }
]

function Login() {
    const [formFields, setFormFields] = useState({
        remember_me: true,
        email: '',
        password: ''
    });
    const [slideIndex, setSlideIndex] = useState(0);
    return (
        <div className="w-full flex-col">
            <div className="flex flex-row">
                <div className="w-full lg:w-2/5 bg-white lg:h-screen grid justify-items-center">
                    <div className="w-3/4 self-center">
                        <h1 className="mb-6 uppercase text-5xl tracking-wide font-agenor-regular font-sans">LogIn</h1>
                        <div className="login-form">
                            <div className="form-panel">
                                <label className="form-label">Email ID</label>
                                <input
                                    className="form-input"
                                    name="email"
                                    value={formFields.email}
                                    onChange={(e) => setFormFields({
                                        ...formFields,
                                        email: e.target.value
                                    })}
                                    type="email" placeholder="Email Address"/>
                            </div>
                            <div className="form-panel mt-4">
                                <label className="form-label">Password</label>
                                <input
                                    className="form-input"
                                    name="password"
                                    value={formFields.password}
                                    onChange={(e) => setFormFields({
                                        ...formFields,
                                        password: e.target.value
                                    })}
                                    type="password" placeholder="Email Address"/>
                            </div>

                            <div className="flex flex-row mt-2">
                                <div className="lg:w-1/2">
                                    <label className="inline-flex items-center">
                                        <input className="form-checkbox" type="checkbox" onChange={() => setFormFields({
                                            ...formFields,
                                            remember_me: !formFields.remember_me
                                        })} checked={formFields.remember_me}/>
                                        <span className="ml-2">Remember Me</span>
                                    </label>
                                </div>
                                <div className="lg:w-1/2 ml-2">
                                    <a href="!#" className="text-primary float-right">Forget Password ?</a>
                                </div>
                            </div>
                            <button type="submit"
                                    className="button bg-primary border-primary float-right mt-5 px-14 py-4 rounded-full border text-sm text-white hover:bg-white hover:text-primary transition duration-200">SIGN
                                IN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="banner w-full lg:w-3/5 lg:h-screen grid">
                    <div className="relative self-end">
                        <div className="relative w-full overflow-hidden text-center">
                            {carousals.map((carousal: any, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <input value={index} className="input-checked hidden" type="radio"
                                               name="carousel" onChange={() => null} checked={slideIndex === index}/>
                                        <div
                                            className="opacity-0 absolute m-auto text-white input-checked:static input-checked:opacity-100 transition-opacity ease-out duration-700">
                                            <img src={carousal.image} alt="Poster"
                                                 className="block max-w-full m-auto w-5/7"/>
                                            <div className="bg-primary h-64 pt-12">
                                                <h2 className="text-3xl font-agenor-regular font-sans tracking-wide">
                                                    {carousal.title}
                                                </h2>
                                                <p className="text-sm tracking-wide font-light mt-2.5 w-5/7 m-auto">
                                                    {carousal.message}
                                                </p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            <ol className="list-none m-0 p-0 absolute bottom-10 left-0 right-0 text-center z-10">
                                {carousals.map((carousal: any, index: number) => (
                                    <li key={index} className="inline-block my-0 mx-1.5"
                                        onClick={() => setSlideIndex(index)}>
                                        <label
                                            className="bg-white cursor-pointer block h-2.5 w-2.5 opacity-50 hover:opacity-100"/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login