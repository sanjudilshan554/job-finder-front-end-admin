<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Job management</h2>
            </div>
            <div class="text-end">
                <button @click.prevent="visitDeletedList" type="button" class="btn btn-danger text-end mr-2"
                    data-whatever="@mdo">
                    <i class="bi bi-trash"></i> Deleted list
                </button>
                <button @click.prevent="visitCompany" type="button" class="btn btn-primary text-end mr-2"
                    data-whatever="@mdo">
                    <i class="bi bi-buildings"></i> Company
                </button>
                <button @click.prevent="visitCategory" type="button" class="btn btn-primary text-end mr-2"
                    data-whatever="@mdo">
                    <i class="bi bi-boxes"></i> Category
                </button>
                <button type="button" class="btn btn-primary text-end" @click.prevent="createJobModal"
                    data-whatever="@mdo">
                    <i class="bi bi-plus-square"></i> Create
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="row mt-4">
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
                                    <tr v-for="job in jobs" class="cursor-pointer" @click.prevent="visitJob(job.id)">
                                        <td>
                                            <span v-if="job.status == 1" class="badge badge-success">Published</span>
                                            <span v-if="job.status == 0" class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ job.name }}</td>
                                        <td>{{ job.slug }}</td>
                                        <td>{{ job.description }}</td>
                                        <td></td>
                                        <td>{{ job.working_hours }}</td>
                                        <td>{{ job.company_name }}</td>
                                        <td>{{ job.category_name }}</td>
                                        <td>{{ job.image_id }}</td>
                                    </tr>
                                </tbody>
                            </table> 

                            <!-- Pagination -->
                            <div v-if="jobs.length > 0" class="row my-3 ps-1 ps-md-0">

                                <div class="col-sm-6">
                                    <div for="purchase_uom" class="col-form-label text-gray-600">
                                        Showing {{ pagination.from }} to
                                        {{ pagination.to }} of
                                        {{ pagination.total }} entries
                                    </div>
                                </div>
                                <div class="col-sm-6 d-flex justify-content-end">
                                    <div class="dataTables_paginate paging_simple_numbers"
                                        id="kt_ecommerce_sales_table_paginate">
                                        <ul class="pagination">
                                            <li class="paginate_button page-item previous"
                                                :class="pagination.current_page == 1 ? 'disabled' : ''"
                                                id="kt_ecommerce_sales_table_previous"><a href="javascript:void(0)"
                                                    @click="setPage(pagination.current_page - 1)"
                                                    aria-controls="kt_ecommerce_sales_table" data-dt-idx="0"
                                                    tabindex="0" class="page-link"><i class="previous"></i></a></li>
                                            <template v-for="(page, index) in pagination.last_page">
                                                <template
                                                    v-if="page == 1 || page == pagination.last_page || Math.abs(page - pagination.current_page) < 5">
                                                    <li class="paginate_button page-item" :key="index"
                                                        :class="pagination.current_page == page ? 'active' : ''"><a
                                                            href="javascript:void(0)" @click="setPage(page)"
                                                            aria-controls="kt_ecommerce_sales_table" data-dt-idx="1"
                                                            tabindex="0" class="page-link">{{ page }}</a></li>
                                                </template>
                                            </template>
                                            <li class="paginate_button page-item next"
                                                :class="pagination.current_page == pagination.last_page ? 'disabled' : ''"
                                                id="kt_ecommerce_sales_table_next"><a href="javascript:void(0)"
                                                    @click="setPage(pagination.current_page + 1)"
                                                    aria-controls="kt_ecommerce_sales_table" data-dt-idx="6"
                                                    tabindex="0" class="page-link"><i class="next"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

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
                            <span v-if="errors?.name" class="text-danger"> {{ errors.name[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Job Category:</label>
                            <div>
                                <multiselect v-model="job.category" :options="jobCategories" :searchable="false"
                                    track-by="id" label="name" :close-on-select="false" :show-labels="false"
                                    placeholder="Select Category">
                                </multiselect>
                                <span v-if="errors?.category_id" class="text-danger"> {{ errors.category_id[0] }}</span>
                                <pre class="language-json"><code>{{ value }}</code></pre>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Job Type:</label>
                            <div>
                                <multiselect v-model="job.type" :options="jobTypes" :searchable="false" label="name"
                                    track-by="id" :close-on-select="false" :show-labels="false"
                                    placeholder="Select Job">
                                </multiselect>
                                <span v-if="errors?.type_id" class="text-danger"> {{ errors.type_id[0] }}</span>
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
import { ref, onMounted } from 'vue';
import axios from 'axios'
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Multiselect from 'vue-multiselect';
import { useRouter } from 'vue-router';
const router = useRouter();

const job = ref({});
const jobs = ref([]);
const jobData = ref({});
const jobCategories = ref([]);
const errors = ref({});

const page = ref(1);
const perPage = ref(10);
const pageCount = ref(25);
const pagination = ref({});

const setPage = async (new_page) => {
    page.value = new_page;
    const url = `http://127.0.0.1:8000/api/job/all?page=${new_page}&per_page=${perPage.value}`;
    await getJobs(url);
};

const jobTypes = [
    { id: 1, name: 'Full Time' },
    { id: 2, name: 'Part Time' },
    { id: 3, name: 'Remote' },
    { id: 4, name: 'Freelance' },
];

const createJob = async () => {
    try {
        clearValidationErrors();
        if (job.value.category?.id) {
            job.value.category_id = job.value.category.id;
            job.value.category_name = job.value.category.name;
        }

        if (job.value.type?.id) {
            job.value.type_id = job.value.type.id;
            job.value.type_name = job.value.type.name;
        }

        const response = await axios.post('http://127.0.0.1:8000/api/job/store', job.value);
        closeCreateModal();
        clearVariables();
        successMessage('Job created successfully');
        getJobs();
        router.push({ name: 'edit-job', params: { job_id: response.data.id } });
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
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

const closeCreateModal = () => {
    $('#createJob').modal('hide');
}

const closeEditModal = () => {
    $('#editJob').modal('hide');
}

const getJobs = async (url = `http://127.0.0.1:8000/api/job/all?page=1&per_page=${perPage.value}`) => {
    try {
        const response = await axios.get(url);
        jobs.value = response.data.data; 
        pagination.value = response.data.meta;
        console.log('hello', response);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    }
};

const updateJob = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.post(`http://127.0.0.1:8000/api/job/update/${id}`, jobData.value);
        $('#editJob').modal('hide');
        successMessage('Job updated successfully');
        getJobs();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/job/delete/${id}`);
        $('#deleteJob').modal('hide');
        successMessage('Job deleted successfully');
        getJobs();
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

const visitDeletedList = () => {
    router.push({ name: 'deleted-job' });
}

const visitCategory = () => {
    router.push({ name: 'job-category' });
}

const visitCompany = () => {
    router.push({ name: 'job-company' });
}

const clearVariables = () => {
    job.value = {};
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}

const visitJob = (id) => {
    router.push({ name: 'edit-job', params: { job_id: id } });
}

const clearValidationErrors = () => {
    errors.value = {};
}

const createJobModal = () => {
    clearVariables();
    clearValidationErrors();
    $('#createJob').modal('show');
}

onMounted(() => {
    getJobs();
    getActivatedCategories();
});
</script>

<style></style>