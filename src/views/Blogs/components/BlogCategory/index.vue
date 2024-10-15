<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Blog Category management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" 
                    @click.prevent="createCategoryModal" data-whatever="@mdo">
                    <i class="bi bi-plus-square"></i> Create
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Blog / Categories</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>status</th>
                                        <th>name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="category in categories" class="cursor-pointer">
                                        <td>
                                            <span v-if="category.status == 1" class="badge badge-success">Enabled</span>
                                            <span v-if="category.status == 0"
                                                class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ category.name }}</td>
                                        <td class="d-flex">
                                            <div class="" @click.prevent="editCategory(category.id)"><i
                                                    class="bi bi-pencil"></i></div>
                                            <div class="" @click.prevent="confirmDelete(category.id)"><i
                                                    class="bi bi-trash ps-2 text-danger"></i></div>
                                        </td>
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
    <div class="modal fade" id="createCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createCategory">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="category.status"
                                    id="flexSwitchCheckDefault">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="category.name">
                            <span class="text-danger" v-if="errors?.name">{{
                                errors.name[0] }}</span>
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
    <div class="modal fade" id="editCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit category</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateCategory(categoryData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch"
                                    v-model="categoryData.status" id="flexSwitchCheckDefault">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="categoryData.name">
                            <span class="text-danger" v-if="errors?.name">{{
                                errors.name[0] }}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            @click.prevent="closeEditModal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal fade" id="deleteCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    Are you sure you want to delete this category?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Cancel</button>
                    <button type="button" class="btn btn-danger"
                        @click.prevent="deleteCategory(categoryData.id)">delete</button>
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

const errors = ref({});
const category = ref({});
const categories = ref([]);
const categoryData = ref({});

const createCategory = async () => {
    try {
        
        const response = await axios.post('http://127.0.0.1:8000/api/blog/category/store', category.value);
        closeCreateModal();
        clearVariables();
        successMessage('Category created successfully');
        getCategories();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const closeCreateModal = () => {
    $('#createCategory').modal('hide');
}

const getCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/category/all');
        categories.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const editCategory = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/category/get/${id}`);
        console.log('hello', response);
        categoryData.value = response.data;
        if (categoryData.value.status == 0) {
            categoryData.value.status = false;
        } else {
            categoryData.value.status = true;
        }
        $('#editCategory').modal('show');
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
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/category/update/${id}`, categoryData.value);
        $('#editCategory').modal('hide');
        successMessage('Category updated successfully');
        getCategories();
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
        $('#deleteCategory').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/category/get/${id}`);
        categoryData.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/category/delete/${id}`);
        $('#deleteCategory').modal('hide');
        successMessage('Category deleted successfully');
        getCategories();
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
    category.value = {};
}

const closeDeleteModal = () => {
    $('#deleteCategory').modal('hide');
}

const closeEditModal = () => {
    $('#editCategory').modal('hide');
}

const createCategoryModal = () => {
    clearVariables();
    clearValidationErrors();
    $('#createCategory').modal('show');
}

const clearValidationErrors = () => {
    errors.value = {};
}
onMounted(() => {
    getCategories();
});
</script>