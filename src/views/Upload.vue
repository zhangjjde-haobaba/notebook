<template>
    <div class="upload">
        <v-sheet
                class="d-flex align-center justify-center flex-wrap text-center mx-auto"
                elevation="4"
                height="250"
                rounded
                max-width="800"
                width="100%"
        >
            <div>
                <h2 class="text-h4 font-weight-black text-orange mb-4">New Function!</h2>

                <div class="text-h5 font-weight-medium">
                    You can upload file here to the cloud storage
                </div>

<!--                <p class="text-body-2 mb-4">-->
<!--                    Please head over to your inbox/spam or others folder to find our verificaiton email.-->
<!--                </p>-->

<!--                <v-btn variant="text" color="orange">Go to Login</v-btn>-->
            </div>
        </v-sheet>
        <h2 class="font-weight-bold ml-2">Upload File Here:</h2>
        <v-file-input
                ref="fileInput"
                multiple
                label="File input"
                @change="uploadFile"
        ></v-file-input>
        <v-progress-linear v-if="uploadProgress !== null" :value="uploadProgress"></v-progress-linear>
        <v-snackbar v-model="snackbar" :timeout="4000" top>
            <span>Upload success</span>
            <template v-slot:action="{ attrs }">
                <v-btn
                        color="green"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import storage from '@/fb.js'
    import { ref, getStorage, uploadBytesResumable, getDownloadURL } from "@firebase/storage";


    export default {
        name: "Upload",
        data(){
            return{
                uploadProgress: null,
                snackbar:false
            }
        },
        methods:{
            async uploadFile(event) {
                // 获取上传的文件
                // const file = event.target.files[0];
                // const fileName = file.name;
                const input = this.$refs.fileInput.$el.querySelector('input[type="file"]')
                const file = input.files[0];
                const fileName = file.name;

                // 创建 Cloud Storage 引用
                const storage = getStorage()
                const storageRef = ref(storage, 'image/' + fileName);

                // 上传文件
                const uploadTask = uploadBytesResumable(storageRef, file);

                // 监听上传状态
                uploadTask.on("state_changed", snapshot => {
                    // 上传中...
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.uploadProgress = progress;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                }, error => {
                    // 上传出错
                    console.error(error);
                }, async () => {
                    // 上传完成，获取文件下载链接
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at", downloadURL);
                    //
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //     console.log('File available at', downloadURL);
                    // });
                    this.snackbar = true

                });
            }
        }
    }
</script>

<style scoped>

</style>