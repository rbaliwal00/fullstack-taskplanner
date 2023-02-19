import Theme5 from "../BackgroundTheme/Theme5";

const LogoutComponent = () => {
    return (
        <div>
            <Theme5 />
            <h1 className='text-4xl mb-10 font-bold text-white'>
                You are Logged Out.
            </h1>
            <div className="text-white">Thank you for using our app. Come back soon!</div>
        </div>
    )
}

export default LogoutComponent;