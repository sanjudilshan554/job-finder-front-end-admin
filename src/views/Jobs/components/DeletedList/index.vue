<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Deleted Job Management</h2>
            </div>
        </div>

        <!-- Content -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Jobs / Deleted-list</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>name</th>
                                        <th>description</th>
                                        <th>company logo</th>
                                        <th>working hours</th>
                                        <th>company name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="deletedJob in deletedJobs" class="cursor-pointer"
                                        @click.prevent="visitJob(job.id)">
                                        <td>
                                            <span v-if="deletedJob.status == 1"
                                                class="badge badge-success">Published</span>
                                            <span v-if="deletedJob.status == 0"
                                                class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ deletedJob.name }}</td>
                                        <td>{{ deletedJob.description }}</td>
                                        <td>{{ deletedJob.image_id }}</td>
                                        <td>{{ deletedJob.working_hours }}</td>
                                        <td>{{ deletedJob.company_name }}</td>
                                        <td>
                                            <div class="" @click.prevent="confirmRecovery(deletedJob.id)">
                                                <i class="bi bi-bootstrap-reboot text-success fs-6"></i>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Pagination -->
                            <div v-if="deletedJobs.length > 0" class="row my-3 ps-1 ps-md-0">

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

    <!-- Delete Modal -->
    <div class="modal fade" id="recoveryJob" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click.prevent="closeRecoveryModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to recovery this job?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeRecoveryModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="recoveryJob()">recovery</button>
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

const deletedJobs = ref({});
const deletedJobId = ref(0);

const page = ref(1);
const perPage = ref(10);
const pageCount = ref(25);
const pagination = ref({});

const setPage = async (new_page) => {
    page.value = new_page;
    const url = `http://127.0.0.1:8000/api/job/all?page=${new_page}&per_page=${perPage.value}`;
    await getDeletedList(url);
}; 

const getDeletedList = async (url = `http://127.0.0.1:8000/api/job/deleted/all?page=1&per_page=${perPage.value}`) => {
    try { 
        const response = await axios.get(url);
        deletedJobs.value = response.data.data;
        pagination.value = response.data.meta;
    } catch (error) {
        errorMessage(error);
    }
}

const confirmRecovery = async (id) => {
    try {
        $('#recoveryJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/job/deleted/get/${id}`);
        deletedJobId.value = response.data.id;
    } catch (error) {
        errorMessage(error);
    }
}

const recoveryJob = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/job/recovery/${deletedJobId.value}`);
        $('#recoveryJob').modal('hide');
        successMessage('Job Recovery successfully');
        getDeletedList();
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

const closeRecoveryModal = () => {
    $('#recoveryJob').modal('hide');
}

onMounted(() => {
    getDeletedList();
});
</script>