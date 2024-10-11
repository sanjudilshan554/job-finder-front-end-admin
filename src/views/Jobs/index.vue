<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between">
            <div class="text-start">
                <h2 class="fw-bold">Job management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" data-bs-toggle="modal"
                    data-bs-target="#createJob" data-whatever="@mdo">
                    Create
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Jobs</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>name</th>
                                        <th>slug</th>
                                        <th>description</th>
                                        <th>company logo</th>
                                        <th>working hours</th>
                                        <th>company name</th>
                                        <th>category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="job in jobs" class="cursor-pointer">
                                        <td>
                                            <span v-if="job.status == 1" class="badge badge-success">Published</span>
                                            <span v-if="job.status == 0" class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ job.name }}</td>
                                        <td>{{ job.slug }}</td>
                                        <td>{{ job.description }}</td>
                                        <td>{{ job.image_id }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Create Modal -->
    <div class="modal fade" id="createJob" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New job</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createJob">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="job.name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Job Category:</label>
                            <div>
                                <multiselect v-model="job.category" :options="jobCategories" :searchable="false"
                                    track-by="id" label="name" :close-on-select="false" :show-labels="false"
                                    placeholder="Select Category">
                                </multiselect>
                                <pre class="language-json"><code>{{ value }}</code></pre>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Job Type:</label>
                            <div>
                                <multiselect v-model="job.type" :options="jobTypes" :searchable="false"
                                    :close-on-select="false" :show-labels="false" placeholder="Select Job">
                                </multiselect>
                                <pre class="language-json"><code>{{ value }}</code></pre>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click="closeCreateModal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit Modal -->
    <div class="modal fade" id="editJob" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New job</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateJob(jobData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="jobData.name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Image:</label>
                            <input type="file" class="form-control" id="recipient-name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text" v-model="jobData.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="jobData.status"
                                    id="flexSwitchCheckDefault">
                                <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox
                                    input</label>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Update</button>
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
                    Are you sure you want to delete this job?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="deleteJob(jobData.id)">delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Multiselect from 'vue-multiselect';
import { useRouter } from 'vue-router';
const router = useRouter();
// import EditJob from '../views/Jobs/edit.vue'

const job = ref({});
const jobs = ref([]);
const jobData = ref({});
const jobCategories = ref([]);

const jobTypes = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five'
];

const createJob = async () => {
    try {
        job.value.category_id = job.value.category.id;
        job.value.category_name = job.value.category.name;
        const response = await axios.post('http://127.0.0.1:8000/api/job/store', job.value);
        closeCreateModal();
        clearVariables();
        successMessage('Job created successfully');
        getJobs();
        await axios.post(`http://127.0.0.1:8000/api/job/edit/${response.data.id}`);
        // router.push({ name: 'edit-job', params: { job_id: response.data.id } });
    } catch (error) {
        errorMessage(error);
    }
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/category/all-enabled');
        jobCategories.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const closeCreateModal = () => {
    $('#createJob').modal('hide');
}

const closeEditModal = () => {
    $('#editJob').modal('hide');
}

const getJobs = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/job/all');
        jobs.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const editJob = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/get/${id}`);
        jobData.value = response.data;
        if (jobData.value.status == 0) {
            jobData.value.status = false;
        } else {
            jobData.value.status = true;
        }
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

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}
onMounted(() => {
    getJobs();
    getActivatedCategories();
});
</script>