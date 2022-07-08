<template>
    <div class="container-fluid mt-3">
        <v-row>
            <section id="hero-animated" class="hero-animated d-flex align-items-center">
                <div class="container-fluid d-flex flex-column justify-content-center align-items-center text-center position-relative"
                    data-aos="zoom-out">
                    <img src="../assets/oc-logo.png" class="img-fluid animated" />
                    <h2><span>Survey Application</span></h2>
                    <p>
                        Create and Manage your Surveys effectively with flexible features
                    </p>
                    <div class="d-flex">
                        <v-btn @click="goLogin" class="mt-4" color="primary" value="log in">Get Started</v-btn>
                    </div>
                </div>
            </section>
        </v-row>
    </div>
    <div class="container-fluid mb-3" style="background:#A2B5BB" >
        <div class="row p-3">
            <div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <div class="icon mx-auto"><i class="bi bi-activity icon" style="font-size:90px"></i></div>
                    <div class="card-body">
                         <h5 class="card-title font-weight-bold">Create</h5>
                        <p class="card-text">Users can easily create surveys, questions and send them to the client.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <div class="icon mx-auto"><i class="bi bi-bounding-box-circles icon" style="font-size:90px"></i></div>
                    <div class="card-body">
                         <h5 class="card-title font-weight-bold">Temp</h5>
                        <p class="card-text">Users can easily create surveys, questions and send them to the client.</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <div class="icon mx-auto"><i class="bi bi-calendar4-week icon" style="font-size:90px"></i></div>
                    <div class="card-body">
                         <h5 class="card-title font-weight-bold">Create</h5>
                        <p class="card-text">Temp</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card" style="width: 18rem;">
                    <div class="icon mx-auto"><i class="bi bi-broadcast icon" style="font-size:90px"></i></div>
                    <div class="card-body">
                         <h5 class="card-title font-weight-bold">Advanced Featues</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data: () => ({
        model: 0,
        cycle: true,
        colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    }),
    methods: {
        goLogin() {
            this.$router.push({ name: "login" });
        },
    },
};
</script>