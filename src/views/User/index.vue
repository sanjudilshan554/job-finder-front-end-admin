<template>
    <!-- Main -->
    <div class="p-2 page-wrapper">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">User management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" @click.prevent="createUserModal"
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
                        <h4 class="card-title">Users</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <!-- <th>status</th> -->
                                        <th>name</th>
                                        <th>email</th>
                                        <!-- <th>description</th>
                                        <th>image</th> -->
                                        <!-- <th>action</th> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in users" class="cursor-pointer"> 
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.email }}</td> 
                                        <td class="d-flex">
                                            <div class="" @click.prevent="editUser(user.id)"><i
                                                    class="bi bi-pencil"></i></div>
                                            <div class="" @click.prevent="confirmDelete(user.id)"><i
                                                    class="bi bi-trash ps-2 text-danger"></i></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Pagination -->
                            <div v-if="users.length > 0" class="row my-3 ps-1 ps-md-0">

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
    <div class="modal fade" id="createUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New user</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createUser">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" id="form3Example1" class="form-control" v-model="user.name" />
                            <span v-if="errors?.name" class="text-danger"> {{ errors.name[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Email:</label>
                            <input type="email" id="form3Example3" class="form-control" v-model="user.email" />
                            <span v-if="errors?.email" class="text-danger"> {{ errors.email[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Password:</label>
                            <input type="password" id="form3Example4" class="form-control" v-model="user.password" />

                            <span
                                v-if="errors?.password && errors.password[0] != 'The password field confirmation does not match.'"
                                class="text-danger"> {{ errors.password[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Password:</label>
                            <input type="password" id="form3Example4" class="form-control"
                                v-model="user.password_confirmation" />

                            <span
                                v-if="errors?.password && errors.password[0] === 'The password field confirmation does not match.'"
                                class="text-danger"> {{ errors.password[0] }}</span>
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
    <div class="modal fade" id="editUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New user</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateUser(userData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" id="form3Example1" class="form-control" v-model="userData.name" />
                            <span v-if="errors?.name" class="text-danger"> {{ errors.name[0] }}</span>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Email:</label>
                            <input type="email" id="form3Example3" class="form-control" v-model="userData.email" />
                            <span v-if="errors?.email" class="text-danger"> {{ errors.email[0] }}</span>
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
    <div class="modal fade" id="deleteUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    Are you sure you want to delete this user?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger"
                        @click.prevent="deleteUser(userData.id)">delete</button>
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
const user = ref({});
const users = ref([]);
const userData = ref({});
const errors = ref({});

const page = ref(10);
const perPage = ref(10);
const pageCount = ref(25);
const pagination = ref({});

const setPage = async (new_page) => {
    page.value = new_page;
    const url = `http://127.0.0.1:8000/api/user/user/all?page=${new_page}&per_page=${perPage.value}`;
    await getUsers(url);
};

const createUser = async () => {
    try {
        clearValidationErrors();
        const response = await axios.post('http://127.0.0.1:8000/api/user/store', user.value);
        closeCreateModal();
        clearVariables();
        successMessage('user created successfully');
        getUsers();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const closeCreateModal = () => {
    $('#createUser').modal('hide');
}

const closeEditModal = () => {
    $('#editUser').modal('hide');
}

const getUsers = async (url = `http://127.0.0.1:8000/api/user/all?page=1&per_page=${perPage.value}`) => {
    try {
        const response = await axios.get(url);
        users.value = response.data.data;
        pagination.value = response.data.meta;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    }
};

const editUser = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.get(`http://127.0.0.1:8000/api/user/get/${id}`);
        userData.value = response.data.data; 
        console.log('res', response);
        $('#editUser').modal('show');
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const updateUser = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, userData.value);
        $('#editUser').modal('hide');
        successMessage('user updated successfully');
        getUsers();
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
        $('#deleteUser').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/user/get/${id}`);
        userData.value = response.data.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteUser = async (id) => {
    try {
        console.log('id',id);
        const response = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
        $('#deleteUser').modal('hide');
        successMessage('user deleted successfully');
        getUsers();
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
    user.value = {};
}

const closeDeleteModal = () => {
    $('#deleteUser').modal('hide');
}

const createUserModal = () => {
    clearVariables();
    clearValidationErrors();
    $('#createUser').modal('show');
}

const clearValidationErrors = () => {
    errors.value = {};
}

const visitJobs = () => {
    router.push({ name: 'jobs' });
}

onMounted(() => {
    getUsers();
});
</script>