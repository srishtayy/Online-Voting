var user_id = localStorage.getItem("user_id");
dynamicInfo();
function dynamicInfo(){
    document.getElementById("currUserName").textContent=user_id;
}