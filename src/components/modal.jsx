const Bg_Modal = ({ modal, setModal, z = "z-20", FN = () => { } }) => {
    return (
        modal && (
            <div
                onClick={() => {
                    modal && setModal && setModal(false);
                    FN();
                }}
                className={`w-full h-full bg-black fixed top-0 right-0 left-0 ${z} bg-opacity-30  `}
            ></div>
        )
    );
};

export default Bg_Modal

