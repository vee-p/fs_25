const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="errormessage">
            {message}
        </div>
    )
}

export default ErrorNotification