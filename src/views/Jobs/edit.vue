<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between">
            <div class="text-start">
                <h2 class="fw-bold">Job # {{ job_id }}</h2>
            </div>
        </div>

        <!-- Content -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Jobs</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>

                        <div class="row">
                            <div class="col-6">
                                <label for="name">Job Name:</label>
                                <input class="form-control form-control" type="text" placeholder="Job Name">
                            </div>
                            <div class="col-6">
                                <label for="name">Category:</label>
                                <div>
                                    <multiselect v-model="job.category" :options="jobCategories" :searchable="false"
                                        track-by="id" label="name" :close-on-select="false" :show-labels="false" 
                                        placeholder="Select Category">
                                    </multiselect>
                                    <pre class="language-json"><code>{{ value }}</code></pre>
                                </div>
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Type:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Experiences:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Location:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Salary:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Working hours:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-6 mt-3">
                                <label for="name">Company name:</label>
                                <input class="form-control form-control" type="text" placeholder=".form-control">
                            </div>
                            <div class="col-12 mt-3">
                                <label for="name">Responsibilities:</label>
                                <textarea class="form-control form-control" type="text" placeholder=".form-control" />
                            </div>
                            <div class="col-12 mt-3">
                                <label for="name">Description:</label>
                                <textarea class="form-control form-control" type="text" placeholder=".form-control" />
                            </div>
                            <div class="mt-3">
                                <label for="name">Image:</label>
                                <input class="form-control form-control" type="file" placeholder=".form-control">
                            </div>
                        </div>
                        <div class="text-end mt-3">
                            <button type="button" class="btn btn-danger text-end" data-bs-toggle="modal"
                                data-bs-target="#createJob" data-whatever="@mdo">
                                Delete
                            </button>
                            <button type="button" class="btn btn-primary text-end ml-2" data-bs-toggle="modal"
                                data-bs-target="#createJob" data-whatever="@mdo">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useRoute } from 'vue-router';
import Multiselect from 'vue-multiselect';
const route = useRoute();

const job = ref({});
const jobs = ref([]);
const jobData = ref({});
const job_id = ref(route.params.job_id);
const jobCategories = ref([]);

const getJob = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/get/${job_id.value}`);
        jobData.value = response.data;
        if (jobData.value.status == 0) {
            jobData.value.status = false;
        } else {
            jobData.value.status = true;
        }
        console.log('job', response);
        $('#editJob').modal('show');
    } catch (error) {
        errorMessage(error);
    }
}

const updateJob = async (id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/job/update/${id}`, jobData.value);
        $('#editJob').modal('hide');
        successMessage('Job updated successfully');
        getJobs();
    } catch (error) {
        errorMessage(error);
    }
}

const confirmDelete = async (id) => {
    try {
        $('#deleteJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/job/get/${id}`);
        jobData.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/job/delete/${id}`);
        $('#deleteJob').modal('hide');
        successMessage('Job deleted successfully');
        getJobs();
    } catch (error) {
        errorMessage(error);
    }
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

const clearVariables = () => {
    job.value = {};
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/all-enabled');
        jobCategories.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}
onMounted(() => {
    getJob();
    getActivatedCategories();
});
</script>