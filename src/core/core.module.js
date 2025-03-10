"use strict";
import { CoreControllerTsController } from './core.controller.ts/core.controller.ts.controller';
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
var common_1 = require("@nestjs/common");
var path_1 = require("path");
var process_1 = require("process");
var nestjs_i18n_1 = require("nestjs-i18n");
var serve_static_1 = require("@nestjs/serve-static");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var CoreModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                nestjs_i18n_1.I18nModule.forRoot({
                    fallbackLanguage: 'fr',
                    fallbacks: {
                        'en-*': 'en',
                        'fr-*': 'fr',
                    },
                    loaderOptions: {
                        path: (0, path_1.join)((0, process_1.cwd)(), '/i18n/'),
                        watch: true,
                    },
                    resolvers: [
                        { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
                        nestjs_i18n_1.AcceptLanguageResolver,
                    ],
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)((0, path_1.join)((0, process_1.cwd)(), 'public')),
                }),
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('DATABASE_HOST'),
                        port: parseInt(configService.get('DATABASE_PORT')),
                        username: configService.get('DATABASE_USER'),
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_DB'),
                        entities: [(0, path_1.join)((0, path_1.resolve)(), '..', '**', '*.model.{ts,js}')],
                        synchronize: true,
                    }); },
                }),
            ],
            controllers: [],
            providers: [],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CoreModule = _classThis = /** @class */ (function () {
        function CoreModule_1() {
        }
        return CoreModule_1;
    }());
    __setFunctionName(_classThis, "CoreModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CoreModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CoreModule = _classThis;
}();
exports.CoreModule = CoreModule;
