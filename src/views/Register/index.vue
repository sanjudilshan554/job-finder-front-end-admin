<template>
    <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
                <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                    The best offer <br />
                    <span style="color: hsl(218, 81%, 75%)">for your business</span>
                </h1>
                <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Temporibus, expedita iusto veniam atque, magni tempora mollitia
                    dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                    ab ipsum nisi dolorem modi. Quos?
                </p>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0 position-relative mt-5 pr-3 mr-0">
                <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                <div class="card bg-glass">
                    <div class="text-center pt-5">
                        <h1>Register</h1>
                    </div>
                    <div class="card-body px-4 py-5 px-md-5">
                        <form @submit.prevent="registerUser">
                            <!-- 2 column grid layout with text inputs for the first and last names -->
                            <div class="row">
                                <div class="col-md-12 mb-4">
                                    <div data-mdb-input-init class="form-outline">
                                        <label class="form-label" for="form3Example1">Name</label>
                                        <input type="text" id="form3Example1" class="form-control"
                                            v-model="User.name" />
                                        <span v-if="errors?.name" class="text-danger"> {{ errors.name[0] }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Email input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form3Example3">Email address</label>
                                <input type="email" id="form3Example3" class="form-control" v-model="User.email" />
                                <span v-if="errors?.email" class="text-danger"> {{ errors.email[0] }}</span>
                            </div>

                            <!-- Password input -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form3Example4">Password</label>
                                <input type="password" id="form3Example4" class="form-control"
                                    v-model="User.password" />
                                
                                <span v-if="errors?.password && errors.password[0] != 'The password field confirmation does not match.'" class="text-danger"> {{ errors.password[0] }}</span>
                            </div>

                            <!-- Password confirm -->
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label class="form-label" for="form3Example4">Password Confirm</label>
                                <input type="password" id="form3Example4" class="form-control"
                                    v-model="User.password_confirmation" />
                                
                                <span
                                    v-if="errors?.password && errors.password[0] === 'The password field confirmation does not match.'"
                                    class="text-danger"> {{ errors.password[0] }}</span>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" data-mdb-button-init data-mdb-ripple-init
                                class="btn btn-primary btn-block mb-4">
                                Sign up
                            </button>
                        </form>

                        <div class="text-center">have an account <span class="text-primary cursor-pointer"
                                @click.prevent="visitLogin">login</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import Swal from "sweetalert2";

const router = useRouter();
const User = ref({});
const errors = ref({});

const visitLogin = () => {
    router.push({ name: 'login' });
}

const clearValidationErrors = () => {
    errors.value = {};
}

const registerUser = async () => {
    try {
        clearValidationErrors();
        User.value.role = 'admin';
        const response = await axios.post('http://127.0.0.1:8000/api/register', User.value);
        console.log('res',response );
        clearValidationErrors();
        clearVariables();
        successMessage('Registration Successfully');
        
    } catch (error) {
        // if (error.response.status === 422) {
        //     errors.value = error.response.data.errors
        // } else {
        //     errorMessage(error);
        // }
        console.log('error',error);
    }
}

const clearVariables = () => {
    User.value = {};
}

const successMessage = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: "success",
        title: title
    });
};

const errorMessage = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Toast.fire({
        icon: "error",
        title: title
    });
};
</script>


<style>
.background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
}

#radius-shape-1 {
    height: 220px;
    width: 220px;
    top: -60px;
    left: -130px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
}

#radius-shape-2 {
    border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
    bottom: -60px;
    right: -110px;
    width: 300px;
    height: 300px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
}

.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}
</style>