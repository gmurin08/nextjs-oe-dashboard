import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {authConfig} from './auth.config'
import {z} from 'zod'
import {sql} from '@vercel/postgres'
import type {User} from 'app/lib/definitions.ts'