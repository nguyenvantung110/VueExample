<template lang="">
<div class="toppage d-flex flex-row gap-3">
    <div class="flow d-flex flex-column gap-2 col-5">
        <button v-for="item in listItem" @click="showDetail(item.id)" class="item">
            <span>{{item.name}}</span>
        </button>
    </div>
    <div class="details col-5" v-if="isClick">
        <code>
            <pre>
            {{detailInfor}}
            </pre>
        </code>
    </div>
</div>
</template>

<script>
export default {
    data() {
        const listItem = [{
                id: 1,
                name: 'Item 1',
                age: 10
            },
            {
                id: 2,
                name: 'Item 2',
                age: 20
            },
            {
                id: 3,
                name: 'Item 3',
                age: 30
            },
            {
                id: 4,
                name: 'Item 4',
                age: 25
            }
        ]

        return {
            isClick: false,
            detailInfor: null,
            listItem
        }
    },
    methods: {
        showDetail(id) {
            this.isClick = true
            this.detailInfor = this.listItem.find(x => x.id === id)
        }
    }
}
</script>

<style scoped>
.toppage {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.slider {
    height: 400px;
    width: 400px;
}

.item {
    border: 2px solid #aaa;
    border-radius: 10px;
    padding: 1rem;
    min-width: 20rem;
    text-align: left;
    background: transparent;
}

.item:focus {
    border: double;
    border-color: #3992f8;
    /* box-shadow: 0px 0px 0px 5px #b4d6fd; */
    animation: highlight 2s infinite;
}

@keyframes highlight {
    0% {
        box-shadow: 0px 0px 0px 0px transparent;
    }

    50% {
        box-shadow: 0px 0px 0px 5px #b4d6fd;
        transform: scale(1.01);
    }

    100% {
        box-shadow: 0px 0px 0px 0px transparent;
    }
}

.details {
    border: 1px solid #aaa;
    border-radius: 10px;
    min-height: 20rem;
}

pre {
    text-align: left;
}
</style>
