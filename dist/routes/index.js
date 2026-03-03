"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const course_routes_1 = __importDefault(require("./course.routes"));
const kyc_routes_1 = __importDefault(require("./kyc.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const file_routes_1 = __importDefault(require("./file.routes"));
const referral_routes_1 = __importDefault(require("./referral.routes"));
const router = (0, express_1.Router)();
// Identity & Auth grouping (Supports LMS Panel expectations)
router.use('/identity/auth', auth_routes_1.default);
router.use('/identity/admin', auth_routes_1.default);
router.use('/identity/profile', auth_routes_1.default);
router.use('/identity/users', user_routes_1.default);
router.use('/identity/kyc', kyc_routes_1.default);
router.use('/identity/referral', referral_routes_1.default);
router.use('/identity/country', auth_routes_1.default); // For /country/all
// Feature-based grouping
router.use('/admin', admin_routes_1.default);
router.use('/courses', course_routes_1.default);
router.use('/transactions', transaction_routes_1.default);
router.use('/file', file_routes_1.default);
exports.default = router;
