<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Job Company management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" @click.prevent="createCompanyModal"
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
                        <h4 class="card-title"> <span class="cursor-pointer" @click.prevent="visitJob">Job </span> / Companies</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>name</th>
                                        <th>web</th>
                                        <th>email</th>
                                        <th>location</th>
                                        <th>address</th>
                                        <th>description</th>
                                        <th>image</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="company in companies" class="cursor-pointer">
                                        <td>
                                            <span v-if="company.status == 1" class="badge badge-success">Enabled</span>
                                            <span v-if="company.status == 0"
                                                class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ company.name }}</td>
                                        <td>{{ company.web_address }}</td>
                                        <td>{{ company.email }}</td>
                                        <td>{{ company.location }}</td>
                                        <td>{{ company.address }}</td>
                                        <td>{{ company.description }}</td>
                                        <td>{{ company.image_id }}</td>
                                        <td class="d-flex">
                                            <div class="" @click.prevent="editCompany(company.id)"><i
                                                    class="bi bi-pencil"></i></div>
                                            <div class="" @click.prevent="confirmDelete(company.id)"><i
                                                    class="bi bi-trash ps-2 text-danger"></i></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Pagination -->
                            <div v-if="companies.length > 0" class="row my-3 ps-1 ps-md-0">

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
    <div class="modal fade" id="createCompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New Company</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createCompany">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" placeholder="Company Name"
                                v-model="company.name">
                            <span v-if="errors?.name" class="text-danger"> {{ errors.name[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Web Address:</label>
                            <input type="text" class="form-control" id="recipient-name" placeholder="Web Address"
                                v-model="company.web_address">
                            <span v-if="errors?.web_address" class="text-danger"> {{ errors.web_address[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Email:</label>
                            <input type="text" v-model="company.email" class="form-control" id="recipient-name"
                                placeholder="Email Address">
                            <span v-if="errors?.email" class="text-danger"> {{ errors.email[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Location:</label>
                            <input type="text" v-model="company.location" class="form-control" id="recipient-name"
                                placeholder="Location">
                            <span v-if="errors?.location" class="text-danger"> {{ errors.location[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Address:</label>
                            <input type="text" v-model="company.address" class="form-control" id="recipient-name"
                                placeholder="Address">
                            <span v-if="errors?.address" class="text-danger"> {{ errors.address[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text" v-model="company.description"></textarea>
                            <span v-if="errors?.description" class="text-danger"> {{ errors.description[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Image:</label>
                            <input type="file" class="form-control" id="recipient-name" placeholder="Image">
                            <!-- <span v-if="errors?.image" class="text-danger"> {{ errors.image[0]
                                        }}</span> -->
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="company.status"
                                    id="flexSwitchCheckDefault">
                                <span v-if="errors?.status" class="text-danger"> {{ errors.status[0]
                                    }}</span>
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
    <div class="modal fade" id="editCompany" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New company</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateCategory(companyData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="companyData.name">
                            <span v-if="errors?.name" class="text-danger"> {{ errors.name[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Web Address:</label>
                            <input type="text" class="form-control" id="recipient-name" placeholder="Web Address"
                                v-model="companyData.web_address">
                            <span v-if="errors?.web_address" class="text-danger"> {{ errors.web_address[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Email:</label>
                            <input type="email" v-model="companyData.email" class="form-control" id="recipient-name"
                                placeholder="Email Address">
                            <span v-if="errors?.email" class="text-danger"> {{ errors.email[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Location:</label>
                            <input type="text" v-model="companyData.location" class="form-control" id="recipient-name"
                                placeholder="Location">
                            <span v-if="errors?.location" class="text-danger"> {{ errors.location[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Address:</label>
                            <input type="text" v-model="companyData.address" class="form-control" id="recipient-name"
                                placeholder="Address">
                            <span v-if="errors?.address" class="text-danger"> {{ errors.address[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text"
                                v-model="companyData.description"></textarea>
                            <span v-if="errors?.description" class="text-danger"> {{ errors.description[0]
                                }}</span>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Image:</label>
                            <input type="file" class="form-control" id="recipient-name">
                            <!-- <span v-if="errors?.image" class="text-danger"> {{ errors.image[0]
                                }}</span> -->
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    v-model="companyData.status" id="flexSwitchCheckDefault">
                                <span v-if="errors?.status" class="text-danger"> {{ errors.status[0]
                                    }}</span>
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
    <div class="modal fade" id="deleteCompany" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    Are you sure you want to delete this company?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger"
                        @click.prevent="deleteCompany(companyData.id)">delete</button>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const company = ref({});
const companies = ref([]);
const companyData = ref({});
const errors = ref({});

const page = ref(1);
const perPage = ref(10);
const pageCount = ref(25);
const pagination = ref({});

const setPage = async (new_page) => {
    page.value = new_page;
    const url = `http://127.0.0.1:8000/api/job/all?page=${new_page}&per_page=${perPage.value}`;
    await getCompanies(url);
};

const createCompany = async () => {
    try {
        clearValidationErrors();
        const response = await axios.post('http://127.0.0.1:8000/api/job/company/store', company.value);
        closeCreateModal();
        clearVariables();
        successMessage('Company created successfully');
        getCompanies();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const closeCreateModal = () => {
    $('#createCompany').modal('hide');
}

const closeEditModal = () => {
    $('#editCompany').modal('hide');
} 

const getCompanies = async (url = `http://127.0.0.1:8000/api/job/company/all?page=1&per_page=${perPage.value}`) => {
    try {
        const response = await axios.get(url);
        companies.value = response.data.data;
        pagination.value = response.data.meta; 
        console.log('dta', companies.value);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    }
};

const editCompany = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.get(`http://127.0.0.1:8000/api/job/company/get/${id}`);
        companyData.value = response.data;
        if (companyData.value.status == 0) {
            companyData.value.status = false;
        } else {
            companyData.value.status = true;
        }
        $('#editCompany').modal('show');
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const updateCategory = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.post(`http://127.0.0.1:8000/api/job/company/update/${id}`, companyData.value);
        $('#editCompany').modal('hide');
        successMessage('Company updated successfully');
        getCompanies();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const confirmDelete = async (id) => {
    try {
        $('#deleteCompany').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/job/company/get/${id}`);
        companyData.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteCompany = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/job/company/delete/${id}`);
        $('#deleteCompany').modal('hide');
        successMessage('Company deleted successfully');
        getCompanies();
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
    company.value = {};
}

const closeDeleteModal = () => {
    $('#deleteCompany').modal('hide');
}

const clearValidationErrors = () => {
    errors.value = {};
}

const createCompanyModal = () => {
    clearVariables();
    clearValidationErrors();
    $('#createCompany').modal('show');
}

const visitJob = () => {
    router.push({ name: 'jobs' });
}

onMounted(() => {
    getCompanies();
});
</script>