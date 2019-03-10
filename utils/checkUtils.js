const validatePassword = (password) => {
    var minNumberofChars = 6;
    var maxNumberofChars = 16;
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if (password.length < minNumberofChars || password.length > maxNumberofChars) {
        return { status: false, message: "Mật khẩu phải lớn hơn 6 và nhỏ hơn 16 kí tự !!" }
    }
    if (!regularExpression.test(password)) {
        return { status: false, message: "Mật khẩu phải chứa ít nhất 1 số và 1 kí tự đặc biệt !!" }
    }
    return { status: true, message: "Đã xác nhận" }
}

const validateEmail = (email) => {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)
}

module.exports = { validatePassword, validateEmail }