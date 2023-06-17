<template>
    <div class="chat">
        <h1 class="subtitle-1 grey--text pa-8">Chat</h1>
        <div class="content">
            <v-card
                    v-for="(message, index) in messages"
                    :key="index"
            >
                <v-card-text>
                    {{ message.content }}
                </v-card-text>
            </v-card>
            <v-text-field
                    v-model="newMessage"
                    @keyup.enter="sendMessage"
                    label="Type your message here"
            ></v-text-field>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Chat",
        data() {
            return {
                messages: [],
                newMessage: ''
            }
        },
        methods: {
            async sendMessage() {
                // 将用户的消息添加到消息列表中
                this.messages.push({ role: 'user', content: this.newMessage });
                const api = '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'
                try {
                    // 向API发送请求
                    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: 'You are a helpful assistant.'
                            },
                            {
                                role: 'user',
                                content: this.newMessage
                            }
                        ]

                    }, {
                        headers: {

                            'Authorization': `Bearer `+api
                        }
                    });

                    // 将API的响应添加到消息列表中
                    this.messages.push({ role: 'assistant', content: response.data.choices[0].message.content });
                } catch (error) {
                    console.error(error);
                }

                // 清空输入框
                this.newMessage = '';
            }
        }
    }
</script>

<style scoped>
.content{
    display:flex;
    flex-direction: column;
    padding: 2rem;
}
</style>