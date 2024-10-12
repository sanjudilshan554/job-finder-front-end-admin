<template>
    <!-- Main -->
    <div class="p-2">
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
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <label for="name">Blog Title:</label>
                                    <input v-model="blogData.title" class="form-control form-control" type="text"
                                        placeholder="Blog Title">
                                </div>

                                <div class="col-4 mt-3">
                                    <label for="name">Category:</label>
                                    <div>
                                        <multiselect v-model="blogData.category" :options="blogCategories"
                                            :searchable="false" track-by="id" label="name" :close-on-select="false"
                                            :show-labels="false" placeholder="Select Category">
                                        </multiselect>
                                        <pre class="language-json"><code>{{ value }}</code></pre>
                                    </div>
                                </div>  

                                <div class="col-12 mt-3">
                                    <label for="name">View Text:</label>
                                    <textarea v-model="blogData.view_text" class="form-control form-control" type="text"
                                        placeholder="View Text"/>
                                </div>
                                <div class="col-12 mt-3">
                                    <label for="name">Text:</label>
                                    <textarea v-model="blogData.text" class="form-control form-control"
                                        type="text" placeholder="Text" />
                                </div> 
                                <div class="col-12 mt-3">
                                    <label for="name">Meta tags:</label>
                                    <textarea v-model="blogData.meta_tags" class="form-control form-control"
                                        type="text" placeholder="Meta Tags" />
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

const blog = ref({});
const blogs = ref([]);
const blogData = ref({});
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

        console.log('blog', response);
        $('#editJob').modal('show');
    } catch (error) {
        errorMessage(error);
    }
}

const updateBlog = async () => {
    try {
        blogData.value.category_id = blogData.value.category.id;
        blogData.value.category_name = blogData.value.category.name;
        console.log('blogData.value', blogData.value);
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/update/${blog_id.value}`, blogData.value);
        successMessage('Blog updated successfully');
        getBlog();
        console.log('update', response);
    } catch (error) {
        errorMessage(error);
    }
}

const confirmDelete = async (id) => {
    try {
        $('#deleteJob').modal('show');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/get/${id}`);
        blogData.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/delete/${id}`);
        $('#deleteJob').modal('hide');
        successMessage('Blog deleted successfully');
        getBlog();
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
    blog.value = {};
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/category/all-enabled');
        blogCategories.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}
onMounted(() => {
    getBlog();
    getActivatedCategories();
});
</script>