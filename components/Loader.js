const Loader = ({ size = "h-8 w-8" }) => {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-white border-t-transparent ${size}`}
        ></div>
    );
};

export default Loader;
