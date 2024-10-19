<template>
    <!-- Main -->
    <div class="p-2 page-wrapper">
        <!-- Header -->
        <div class="d-flex justify-content-between">
            <div class="text-start">
                <h2 class="fw-bold">Blog # {{ blog_id }}</h2>
            </div>
        </div>

        <!-- Content -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <form @submit.prevent="updateBlog" enctype="multipart/form-data">
                        <div class="card-body">
                            <!-- <h4 class="card-title">Jobs</h4>
                        <h6 class="card-subtitle">Add class <code>.table</code></h6> -->

                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Status:</label>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch"
                                                v-model="blogData.status" id="flexSwitchCheckDefault">
                                            <span class="text-danger" v-if="errors?.status">{{
                                                errors.status[0] }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="name">Blog Title:</label>
                                    <input v-model="blogData.title" class="form-control form-control" type="text"
                                        placeholder="Blog Title">
                                    <span class="text-danger" v-if="errors?.title">{{
                                        errors.title[0] }}</span>
                                </div>

                                <div class="col-4 mt-3">
                                    <label for="name">Category:</label>
                                    <div>
                                        <multiselect v-model="blogData.category" :options="blogCategories"
                                            :searchable="false" track-by="id" label="name" :close-on-select="false"
                                            :show-labels="false" placeholder="Select Category">
                                        </multiselect>
                                        <span class="text-danger" v-if="errors?.category_id">{{
                                            errors.category_id[0] }}</span>
                                    </div>
                                </div>

                                <div class="col-12 mt-3">
                                    <label for="name">View Text:</label>
                                    <textarea v-model="blogData.view_text" class="form-control form-control" type="text"
                                        placeholder="View Text" />
                                    <span class="text-danger" v-if="errors?.view_text">{{
                                        errors.view_text[0] }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Text:</label>
                                    <textarea v-model="blogData.text" class="form-control form-control" type="text"
                                        placeholder="Text" />
                                    <span class="text-danger" v-if="errors?.text">{{
                                        errors.text[0] }}</span>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Meta tags:</label>
                                    <textarea v-model="blogData.meta_tags" class="form-control form-control" type="text"
                                        placeholder="Meta Tags" />
                                    <span class="text-danger" v-if="errors?.meta_tags">{{
                                        errors.meta_tags[0] }}</span>
                                </div>
                                <div class="mt-3">
                                    <label for="name">Image:</label>
                                    <input class="form-control form-control" type="file" placeholder=".form-control">
                                    <span class="text-danger" v-if="errors?.image">{{
                                        errors.image[0] }}</span>
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
        <div class="modal fade" id="deleteBlog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                        <button type="button" class="btn btn-danger" @click.prevent="deleteBlog()">delete</button>
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

const blog = ref({});
const blogs = ref([]);
const blogData = ref({});
const errors = ref({});
const blog_id = ref(route.params.blog_id);
const blogCategories = ref([]);

const getBlog = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/get/${blog_id.value}`);
        blogData.value = response.data;
        if (blogData.value.status == 0) {
            blogData.value.status = false;
        } else {
            blogData.value.status = true;
        }
        blogData.value.category = { id: blogData.value.category_id, name: blogData.value.category_name };
        $('#editJob').modal('show');
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const updateBlog = async () => {
    try {
        blogData.value.category_id = blogData.value.category.id;
        blogData.value.category_name = blogData.value.category.name;
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/update/${blog_id.value}`, blogData.value);
        clearErrorMessage();
        successMessage('Blog updated successfully');
        getBlog();
        console.log('update', response);
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
        $('#deleteBlog').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/get/${blog_id.value}`);
        blogData.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const deleteBlog = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/delete/${blog_id.value}`);
        $('#deleteBlog').modal('hide');
        successMessage('Blog deleted successfully');
        router.push({ name: 'blogs' });
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
    blog.value = {};
}

const clearErrorMessage = () => {
    errors.value = {};
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/category/all-enabled');
        blogCategories.value = response.data;
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors
        } else {
            errorMessage(error);
        }
    }
}

const closeDeleteModal = () => {
    $('#deleteBlog').modal('hide');
}
onMounted(() => {
    getBlog();
    getActivatedCategories();
});
</script>