<template>
    <div class="nya-container">
        <ul>
            <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
        </ul>
        <input v-model="inputMessage" placeholder="输入消息" />
        <button @click="sendMessage">发送</button>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as signalR from '@microsoft/signalr';
// 定义响应式数据
const messages = ref([]);
const inputMessage = ref('');
let connection = null;

// 初始化 SignalR 连接
const startConnection = async () => {
    try {
        connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5234/notificationHub', {
                withCredentials: true, // 允许携带凭据
                transport: signalR.HttpTransportType.WebSockets // 强制使用WebSocket
            })
            .build();

        connection.on('ReceiveMessage', (user, message) => {

            messages.value.push(`${user}: ${message}`);
        });

        await connection.start();
        console.log('SignalR 连接已建立');
    } catch (error) {
        console.error('SignalR 连接失败:', error);
    }
};

// 发送消息到服务器
const sendMessage = async () => {
    if (connection && inputMessage.value) {
        await connection.invoke('SendMessage', 'Vue 用户', inputMessage.value);
        inputMessage.value = '';
    }
};

// 组件挂载时启动连接
onMounted(() => {
    startConnection();
});

</script>
<style lang="scss">
.nya-container {
    //position: relative;
    border: 1px solid red;
    padding: 25px 32px;
    margin-top: 18px;
    margin-bottom: 50px;
    box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
        1px 3px 8px rgba(39, 44, 49, 0.03);
    background-color: #fff;
    border: none;
    border-radius: 8px;
}
</style>