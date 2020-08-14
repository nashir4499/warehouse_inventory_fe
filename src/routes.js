import Layout from './component/Login/Layout'
import FullLayout from './component/Home/FullLayout'
import Dashboard from './component/Home/Dashboard'
import Login from './component/Login/Login'
import { Redirect } from 'react-router-dom'
import React from 'react'
import BarangMasuk from './component/Home/BarangMasuk'
import TambahBarangMasuk from './component/Home/TambahBarangMasuk'
import UbahBarangMasuk from './component/Home/UbahBarangMasuk'
import Rak from './component/Home/Rak'
import TambahRak from './component/Home/TambahRak'
import UbahRak from './component/Home/UbahRak'
import IsiRak from './component/Home/IsiRak'
import UbahIsiRak from './component/Home/UbahIsiRak'
import Barang from './component/Home/Barang'
import TambahBarang from './component/Home/TambahBarang'
import UbahBarang from './component/Home/UbahBarang'

export default [
    {
        path: '/',
        layout: Layout,
        component: () => <Redirect to="/login" />
    },
    {
        path: '/login',
        layout: Layout,
        component: Login
    },
    {
        path: '/dashboard',
        layout: FullLayout,
        component: Dashboard
    },
    {
        path: '/barang',
        layout: FullLayout,
        component: Barang
    },
    {
        path: '/barang/tambah',
        layout: FullLayout,
        component: TambahBarang
    },
    {
        path: '/barang/ubah/:id',
        layout: FullLayout,
        component: UbahBarang
    },
    {
        path: '/barangmasuk',
        layout: FullLayout,
        component: BarangMasuk
    },
    {
        path: '/barangmasuk/tambah',
        layout: FullLayout,
        component: TambahBarangMasuk
    },
    {
        path: '/barangmasuk/ubah/:id',
        layout: FullLayout,
        component: UbahBarangMasuk
    },
    {
        path: '/rak',
        layout: FullLayout,
        component: Rak
    },
    {
        path: '/rak/tambah',
        layout: FullLayout,
        component: TambahRak
    },
    {
        path: '/rak/ubah/:id',
        layout: FullLayout,
        component: UbahRak
    },
    {
        path: '/isirak',
        layout: FullLayout,
        component: IsiRak
    },
    {
        path: '/isirak/ubah/:id',
        layout: FullLayout,
        component: UbahIsiRak
    }
]