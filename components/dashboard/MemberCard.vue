<template>
    <NuxtLink :to="`/members/${member.id}`" class="text-decoration-none">
        <div class="member-card rounded bg-light is-hoverable box-shadow-2 me-3 p-0 mt-3">
            <div class="h-100 d-flex flex-column justify-content-center align-items-center" style="width: inherit !important;">
                <div class="h-50 w-100 pfp bg-info rounded-top"></div>
                <div class="h-50 w-100 p-3 rounded-bottom">
                    <h5 class="text-dark">
                        {{member.first_name}}
                    </h5>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
<script>
    export default {
        name: 'MemberCard',
        props: ['member'],
        data() {
            return {}
        },
        created(){},
        methods: {}
    }
</script>
<style lang="scss">
    .member-card {
        height: 250px !important;
        width: 170px !important;

        .pfp {}
    }
</style>