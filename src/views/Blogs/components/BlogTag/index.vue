<template>
    <!-- Main -->
    <div class="p-2">

        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Blog Tag management</h2>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary text-end" @click.prevent="createTagModal"
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
                        <h4 class="card-title">Blog / Tags</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>slug</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tag in blogTag" class="cursor-pointer">
                                        <td>{{ tag.name }}</td>
                                        <td>{{ tag.slug }}</td>
                                        <td class="d-flex">
                                            <div class="" @click.prevent="editTag(tag.id)"><i class="bi bi-pencil"></i>
                                            </div>
                                            <div class="" @click.prevent="confirmDelete(tag.id)"><i
                                                    class="bi bi-trash ps-2 text-danger"></i></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <!-- Pagination -->
                            <div v-if="blogTag.length > 0" class="row my-3 ps-1 ps-md-0">

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
    <div class="modal fade" id="createTag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New tag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createTag">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tag.name">
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
    <div class="modal fade" id="editTag" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New tag</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateTag(tagData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="tagData.name">
                            <span class="text-danger" v-if="errors?.name">{{
                                errors.name[0] }}</span>
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
                    Are you sure you want to delete this tag?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="deleteJob(tagData.id)">delete</button>
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

const tag = ref({});
const blogTag = ref([]);
const tagData = ref({});
const jobCategories = ref([]);
const errors = ref({});

const page = ref(1);
const perPage = ref(10);
const pageCount = ref(25);
const pagination = ref({});

const setPage = async (new_page) => {
    page.value = new_page;
    const url = `http://127.0.0.1:8000/api/blog/tag/all?page=${new_page}&per_page=${perPage.value}`;
    await getCategories(url);
};

const getTags = async (url = `http://127.0.0.1:8000/api/blog/tag/all?page=1&per_page=${perPage.value}`) => {
    try {
        const response = await axios.get(url);
        blogTag.value = response.data.data;
        pagination.value = response.data.meta;
        console.log('hello', blogTag.value);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        } else {
            console.error(error);
        }
    }
};

const createTag = async () => {
    try {
        clearValidationErrors();
        const response = await axios.post('http://127.0.0.1:8000/api/blog/tag/store', tag.value);
        closeCreateModal();
        clearVariables();
        successMessage('Job created successfully');
        getTags();
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
} 

const closeCreateModal = () => {
    $('#createTag').modal('hide');
}

const closeEditModal = () => {
    $('#editTag').modal('hide');
}

const editTag = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/tag/get/${id}`);
        tagData.value = response.data;
        $('#editTag').modal('show');
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const updateTag = async (id) => {
    try {
        clearValidationErrors();
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/tag/update/${id}`, tagData.value);
        $('#editTag').modal('hide');
        successMessage('Job updated successfully');
        getTags();
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
        $('#deleteJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/tag/get/${id}`);
        tagData.value = response.data;
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
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/tag/delete/${id}`);
        $('#deleteJob').modal('hide');
        successMessage('Job deleted successfully');
        getTags();
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
    tag.value = {};
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}

const createTagModal = () => {
    clearVariables();
    clearValidationErrors();
    $('#createTag').modal('show');
}

const clearValidationErrors = () => {
    errors.value = {};
}

onMounted(() => {
    getTags(); 
});
</script>