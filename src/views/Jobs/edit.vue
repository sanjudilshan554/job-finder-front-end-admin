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
                    <form @submit.prevent="updateJob" enctype="multipart/form-data">
                        <div class="card-body">

                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Status:</label>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch"
                                                v-model="jobData.status" id="flexSwitchCheckDefault">

                                        </div>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <label for="name">Job Name:</label>
                                    <input v-model="jobData.name" class="form-control form-control" type="text"
                                        placeholder="Job Name">
                                    <span v-if="errors?.name" class="text-danger"> {{ errors.name[0] }}</span>
                                </div>
                                <div class="col-4">
                                    <label for="name">Category:</label>
                                    <div>
                                        <multiselect v-model="jobData.category" :options="jobCategories"
                                            :searchable="false" track-by="id" label="name" :close-on-select="false"
                                            :show-labels="false" placeholder="Select Category">
                                        </multiselect>
                                        <span v-if="errors?.category" class="text-danger"> {{ errors.category[0]
                                            }}</span>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <label for="name">Type:</label>
                                    <multiselect v-model="jobData.type" :options="jobTypes" :searchable="false"
                                        track-by="id" label="name" :close-on-select="false" :show-labels="false"
                                        placeholder="Select Job Type">
                                    </multiselect>
                                    <span v-if="errors?.type" class="text-danger"> {{ errors.type[0] }}</span>
                                </div>

                                <div class="col-4 mt-3">
                                    <label for="name">Location:</label>
                                    <input v-model="jobData.location" class="form-control form-control" type="text"
                                        placeholder="Location">
                                    <span v-if="errors?.location" class="text-danger"> {{ errors.location[0] }}</span>
                                </div>
                                <div class="col-4 mt-3">
                                    <label for="name">Salary:</label>
                                    <input v-model="jobData.salary" class="form-control form-control" type="text"
                                        placeholder="Salary">
                                    <span v-if="errors?.salary" class="text-danger"> {{ errors.salary[0] }}</span>
                                </div>
                                <div class="col-4 mt-3">
                                    <label for="name">Vacancy:</label>
                                    <input v-model="jobData.no_of_vacancy" class="form-control form-control" type="text"
                                        placeholder="Number of Vacancy">
                                    <span v-if="errors?.no_of_vacancy" class="text-danger"> {{ errors.no_of_vacancy[0]
                                        }}</span>
                                </div>
                                <div class="col-6 mt-3">
                                    <label for="name">Working hours:</label>
                                    <input v-model="jobData.working_hours" class="form-control form-control" type="text"
                                        placeholder="Working Hours">
                                    <span v-if="errors?.working_hours" class="text-danger"> {{ errors.working_hours[0]
                                        }}</span>
                                </div>
                                <div class="col-6 mt-3">
                                    <label for="name">Company name:</label>
                                    <input v-model="jobData.company_name" class="form-control form-control" type="text"
                                        placeholder="Company Name">
                                    <span v-if="errors?.company_name" class="text-danger"> {{ errors.company_name[0]
                                        }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Description:</label>
                                    <textarea v-model="jobData.description" class="form-control form-control"
                                        type="text" placeholder="Description" />
                                    <span v-if="errors?.description" class="text-danger"> {{ errors.description[0]
                                        }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Requirements:</label>
                                    <textarea v-model="jobData.requirements" class="form-control form-control"
                                        type="text" placeholder="Requirements" />
                                    <span v-if="errors?.requirements" class="text-danger"> {{ errors.requirements[0]
                                        }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Responsibilities:</label>
                                    <textarea v-model="jobData.responsibilities" class="form-control form-control"
                                        type="text" placeholder="Responsibilities" />
                                    <span v-if="errors?.responsibilities" class="text-danger"> {{
                                        errors.responsibilities[0] }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Education + Experiences:</label>
                                    <textarea v-model="jobData.experience" class="form-control form-control" type="text"
                                        placeholder="Experience" />
                                    <span v-if="errors?.experience" class="text-danger"> {{ errors.experience[0]
                                        }}</span>
                                </div>


                                <div class="mt-3">
                                    <label for="name">Image:</label>
                                    <input class="form-control form-control" type="file" placeholder=".form-control">
                                </div>
                            </div>
                            <div class="text-end mt-3">
                                <button type="button" class="btn btn-danger text-end" data-bs-toggle="modal"
                                    @click.prevent="confirmDelete()" data-bs-target="#createJob" data-whatever="@mdo">
                                    Delete
                                </button>
                                <button type="submit" class="btn btn-primary text-end ml-2" data-bs-toggle="modal"
                                    data-bs-target="#createJob" data-whatever="@mdo">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteJob" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                            @click.prevent="closeDeleteModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this blog?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click.prevent="closeDeleteModal">Close</button>
                        <button type="button" class="btn btn-danger" @click.prevent="deleteJob()">delete</button>
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
import { useRoute, useRouter } from 'vue-router';
import Multiselect from 'vue-multiselect';
const route = useRoute();
const router = useRouter();

const job = ref({});
const jobData = ref({});
const job_id = ref(route.params.job_id);
const jobCategories = ref([]);
const errors = ref({});

const jobTypes = [
    { id: 1, name: 'Full Time' },
    { id: 2, name: 'Part Time' },
    { id: 3, name: 'Remote' },
    { id: 4, name: 'Freelance' },
];

const getJob = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/get/${job_id.value}`);
        jobData.value = response.data;
        if (jobData.value.status == 0) {
            jobData.value.status = false;
        } else {
            jobData.value.status = true;
        }

        jobData.value.category = { id: jobData.value.category_id, name: jobData.value.category_name };
        jobData.value.type = { id: jobData.value.type_id, name: jobData.value.type_name };
        $('#editJob').modal('show');
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const updateJob = async () => {
    try {
        clearValidationErrors();
        if (jobData.value?.category.id) {
            jobData.value.category_id = jobData.value.category.id;
            jobData.value.category_name = jobData.value.category.name;
        }
        if (jobData.value.type?.id) {
            jobData.value.type_id = jobData.value.type.id;
            jobData.value.type_name = jobData.value.type.name;
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/job/update/${job_id.value}`, jobData.value);
        successMessage('Job updated successfully');
        getJob();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const confirmDelete = async () => {
    try {
        $('#deleteJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/job/get/${job_id.value}`);
        jobData.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteJob = async () => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/job/delete/${job_id.value}`);
        $('#deleteJob').modal('hide');
        successMessage('Job deleted successfully');
        router.push({ name: 'jobs' });
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
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
        const response = await axios.get('http://127.0.0.1:8000/api/job/category/all-enabled');
        jobCategories.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}

const clearValidationErrors = () => {
    errors.value = {};
}

onMounted(() => {
    getJob();
    getActivatedCategories();
});
</script>