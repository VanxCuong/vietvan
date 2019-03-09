document.addEventListener("DOMContentLoaded",function () {
    let ChoosePassword = document.getElementById("choosePassword") // Khung chọn mật khẩu
    let fixedBanner = document.getElementById("fixed-banner") // Khung chọn mật khẩu
    let ChooseResetPassword = document.getElementById("btn-reset") // reset chọn mật khẩu
    let ChooseClosePassword = document.getElementById("btn-close") // Thoát khung chọn mk
    let turnChoose = document.getElementById("isChoose") // số lượng click
    let test = document.getElementById("test")
    let pst = resetPostion()
    let pwtouch = document.getElementById("pwtouch") // Click pwtour de hien thi khung chon mk
    pwtouch.addEventListener("click",function(e){
        turnChoose.innerHTML = pst.turn // show turn
        fixedBanner.classList.add("show")
    })
    // Gán số lượt đc click khi load
    turnChoose.innerHTML = pst.turn
    /**
     * Hủy (close) chọn mật khẩu
     */
    ChooseClosePassword.addEventListener("click", function(e){
        fixedBanner.classList.remove("show")
        close()
    })
    /**
     * làm mới (reset) chọn mật khẩu
     * */
    ChooseResetPassword.addEventListener("click", function(e){
        close()
    })
    // click chọn mật khẩu
    ChoosePassword.addEventListener("click", function(e){
        if(pst.turn ==  0 ){
            return alert('Bạn đã hết lượt click');
        }
        // click đủ 5 lần
        let { password } = pst
        if(pst.turn == 5){
            // khi là lần đầu tiên: chỉ gán vị trí hiện tại
            pst.clientX = e.clientX
            pst.clientY = e.clientY
        }else{
            // covert vị trí sang text để gán mk
            // Nếu vị trí X click hiện tại > X trước : phải (P) -> trái(T)
            let convertX = e.clientX > pst.clientX ? 'P' :'T'
            // Nếu vị trí Y click hiện tại > Y trước : Dưới (D) -> Trên (T)
            let convertY = e.clientY > pst.clientY ? 'D' :'T'
            // gán mật khẩu
            pst.password += convertY+convertX
            // gán tọa độ vị trí hiện tại
            pst.clientX = e.clientX
            pst.clientY = e.clientY
            if(pst.turn ==  1 ){
                // reset pst
                // Gán mật khẩu vừa chọn vào input
                document.getElementById('password').value = pst.password
                pst = resetPostion()
                fixedBanner.classList.remove("show")
                return
            }
        }
        pst.turn-- // Giảm 1 lượt khi click
        turnChoose.innerHTML = pst.turn // show turn
        test.innerHTML = `Vị trí trước: (${pst.clientX},${pst.clientY}) , Vị trí chuyển đổi: ${pst.convert} , password: ${pst.password}`
    })
    function close(){
        pst = resetPostion()
        turnChoose.innerHTML = pst.turn // show turn
        test.innerHTML = `Vị trí trước: (${pst.clientX},${pst.clientY}) , Vị trí chuyển đổi: ${pst.convert} , password: ${pst.password}`
    }
})


function resetPostion(){
    return {
        clientX: 0 ,
        clientY: 0 ,
        convert: "",
        password: "",
        turn: 5,
    }
}
