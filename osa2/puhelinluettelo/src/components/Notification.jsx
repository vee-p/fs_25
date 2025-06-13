const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="infomessage">
            {message}
        </div>
    )
}

export default Notification