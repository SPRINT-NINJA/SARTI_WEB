import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            rates: [
                {
                    id: 1,
                    username: "User 1",
                    rate: 4,
                    avatar: "https://picsum.photos/1000/1000",
                    comment: "Comment 1",
                },
                {
                    id: 2,
                    username: "User 2",
                    rate: 6,
                    avatar: "https://picsum.photos/1000/1000",
                    comment: "Comment 2",
                },
                {
                    id: 3,
                    username: "User 3",
                    rate: 9,
                    avatar: "https://picsum.photos/1000/1000",
                    comment: "Comment 3",
                },
                {
                    id: 4,
                    username: "User 4",
                    rate: 8.5,
                    avatar: "https://picsum.photos/1000/1000",
                    comment: "Comment 4",
                },
            ]
        }
    },
})