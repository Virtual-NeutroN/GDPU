document.addEventListener("DOMContentLoaded", function() {
    function updateCountdown() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        let targetTime, titleText;

        const nextStart = new Date(now);
        const nextEnd = new Date(now);

        // 空调的时间段：上午11:30 - 下午14:00，晚上20:30 - 次日7:00
        if (currentHour < 11 || (currentHour === 11 && currentMinute < 30)) {
            // 上午倒计时到11:30
            nextStart.setHours(11, 30, 0, 0);
            nextEnd.setHours(14, 0, 0, 0);
            targetTime = nextStart;
            titleText = "空调启动倒计时";
        } else if (currentHour >= 11 && currentHour < 14) {
            // 如果当前时间在11:30到14:00之间，倒计时到空调关闭
            nextEnd.setHours(14, 0, 0, 0);
            targetTime = nextEnd;
            titleText = "空调正在开放中";
        } else if (currentHour < 20 || (currentHour === 20 && currentMinute < 30)) {
            // 下午倒计时到20:30
            nextStart.setHours(20, 30, 0, 0);
            nextEnd.setHours(7 + 24, 0, 0, 0); // 次日7:00
            targetTime = nextStart;
            titleText = "空调启动倒计时";
        } else if (currentHour >= 20 || (currentHour < 7)) {
            // 如果当前时间在20:30到次日7:00之间，倒计时到空调关闭
            nextEnd.setHours(7 + 24, 0, 0, 0); // 次日7:00
            targetTime = nextEnd;
            titleText = "空调正在开放中";
        }

        const timeRemaining = targetTime - now;

        // 计算时分秒毫秒
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((timeRemaining % 1000));

        document.querySelector("h1").textContent = titleText;
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
        document.getElementById("milliseconds").textContent = String(milliseconds).padStart(3, '0');

        // 每10毫秒更新一次倒计时
        setTimeout(updateCountdown, 10);
    }

    // 页面加载后启动倒计时
    updateCountdown();
});
