<template>
    <!-- Main -->
    <div class="p-2">
        <!-- Header -->
        <div class="d-flex justify-content-between mt-4">
            <div class="text-start">
                <h2 class="fw-bold">Blog management</h2>
            </div>
            <div class="text-end">
                <a href="blogs/category" type="button" class="btn btn-primary text-end mr-2" 
                     data-whatever="@mdo">
                    <i class="bi bi-boxes"></i> Category
                </a>
                <button type="button" class="btn btn-primary text-end mr-2" data-bs-toggle="modal"
                    data-bs-target="#createBlog" data-whatever="@mdo">
                    <i class="bi bi-tags"></i> Tags
                </button>
                <button type="button" class="btn btn-primary text-end" data-bs-toggle="modal"
                    data-bs-target="#createBlog" data-whatever="@mdo">
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
                                    <tr v-for="blog in blogs" class="cursor-pointer">
                                        <td>
                                            <span v-if="blog.status == 1" class="badge badge-success">Published</span>
                                            <span v-if="blog.status == 0" class="badge badge-secondary">Disabled</span>
                                        </td>
                                        <td>{{ blog.name }}</td>
                                        <td>{{ blog.slug }}</td>
                                        <td>{{ blog.description }}</td>
                                        <td>{{ blog.image_id }}</td>
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
    <div class="modal fade" id="createBlog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New blog</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                        @click="closeCreateModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createBlog">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Title:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="blog.title">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Blog Category:</label>
                            <div>
                                <multiselect v-model="blog.category" :options="blogCategories" :searchable="false"
                                    track-by="id" label="name" :close-on-select="false" :show-labels="false"
                                    placeholder="Select Category">
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
                    <h5 class="modal-title" id="exampleModalLabel">New blog</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeEditModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="updateJob(blogData.id)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="blogData.name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Image:</label>
                            <input type="file" class="form-control" id="recipient-name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text" v-model="blogData.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Status:</label>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" v-model="blogData.status"
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
                    Are you sure you want to delete this blog?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                        @click.prevent="closeDeleteModal">Close</button>
                    <button type="button" class="btn btn-danger" @click.prevent="deleteJob(blogData.id)">delete</button>
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

const blog = ref({});
const blogs = ref([]);
const blogData = ref({});
const blogCategories = ref([]);

const createBlog = async () => {
    try {
        blog.value.category_id = blog.value.category.id;
        blog.value.category_name = blog.value.category.name;
        
        const response = await axios.post('http://127.0.0.1:8000/api/blog/store', blog.value);
        closeCreateModal();
        clearVariables();
        successMessage('Blog created successfully');
        getJobs();
        router.push({ name: 'edit-blog', params: { blog_id: response.data.id } });
    } catch (error) {
        errorMessage(error);
    }
}

const getActivatedCategories = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/category/all-enabled');
        console.log('respnose',response);
        blogCategories.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const closeCreateModal = () => {
    $('#createBlog').modal('hide');
}

const closeEditModal = () => {
    $('#editJob').modal('hide');
}

const getJobs = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/all');
        blogs.value = response.data;
    } catch (error) {
        errorMessage(error);
    }
}

const editJob = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/get/${id}`);
        blogData.value = response.data;
        if (blogData.value.status == 0) {
            blogData.value.status = false;
        } else {
            blogData.value.status = true;
        }
        $('#editJob').modal('show');
    } catch (error) {
        errorMessage(error);
    }
}

const updateJob = async (id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/update/${id}`, blogData.value);
        $('#editJob').modal('hide');
        successMessage('Blog updated successfully');
        getJobs();
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
    blog.value = {};
}

const closeDeleteModal = () => {
    $('#deleteJob').modal('hide');
}
onMounted(() => {
    getJobs();
    getActivatedCategories();
});
</script>