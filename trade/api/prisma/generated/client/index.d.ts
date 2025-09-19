
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model investments
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type investments = $Result.DefaultSelection<Prisma.$investmentsPayload>
/**
 * Model transactions
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type transactions = $Result.DefaultSelection<Prisma.$transactionsPayload>
/**
 * Model users
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model wallets
 * 
 */
export type wallets = $Result.DefaultSelection<Prisma.$walletsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Investments
 * const investments = await prisma.investments.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Investments
   * const investments = await prisma.investments.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.investments`: Exposes CRUD operations for the **investments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investments
    * const investments = await prisma.investments.findMany()
    * ```
    */
  get investments(): Prisma.investmentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transactions`: Exposes CRUD operations for the **transactions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transactions.findMany()
    * ```
    */
  get transactions(): Prisma.transactionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallets`: Exposes CRUD operations for the **wallets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallets.findMany()
    * ```
    */
  get wallets(): Prisma.walletsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.1
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    investments: 'investments',
    transactions: 'transactions',
    users: 'users',
    wallets: 'wallets'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "investments" | "transactions" | "users" | "wallets"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      investments: {
        payload: Prisma.$investmentsPayload<ExtArgs>
        fields: Prisma.investmentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.investmentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.investmentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          findFirst: {
            args: Prisma.investmentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.investmentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          findMany: {
            args: Prisma.investmentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>[]
          }
          create: {
            args: Prisma.investmentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          createMany: {
            args: Prisma.investmentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.investmentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>[]
          }
          delete: {
            args: Prisma.investmentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          update: {
            args: Prisma.investmentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          deleteMany: {
            args: Prisma.investmentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.investmentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.investmentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>[]
          }
          upsert: {
            args: Prisma.investmentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$investmentsPayload>
          }
          aggregate: {
            args: Prisma.InvestmentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestments>
          }
          groupBy: {
            args: Prisma.investmentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestmentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.investmentsCountArgs<ExtArgs>
            result: $Utils.Optional<InvestmentsCountAggregateOutputType> | number
          }
        }
      }
      transactions: {
        payload: Prisma.$transactionsPayload<ExtArgs>
        fields: Prisma.transactionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transactionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transactionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findFirst: {
            args: Prisma.transactionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transactionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          findMany: {
            args: Prisma.transactionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          create: {
            args: Prisma.transactionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          createMany: {
            args: Prisma.transactionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.transactionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          delete: {
            args: Prisma.transactionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          update: {
            args: Prisma.transactionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          deleteMany: {
            args: Prisma.transactionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transactionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.transactionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>[]
          }
          upsert: {
            args: Prisma.transactionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transactionsPayload>
          }
          aggregate: {
            args: Prisma.TransactionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransactions>
          }
          groupBy: {
            args: Prisma.transactionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.transactionsCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      wallets: {
        payload: Prisma.$walletsPayload<ExtArgs>
        fields: Prisma.walletsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.walletsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.walletsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          findFirst: {
            args: Prisma.walletsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.walletsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          findMany: {
            args: Prisma.walletsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>[]
          }
          create: {
            args: Prisma.walletsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          createMany: {
            args: Prisma.walletsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.walletsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>[]
          }
          delete: {
            args: Prisma.walletsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          update: {
            args: Prisma.walletsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          deleteMany: {
            args: Prisma.walletsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.walletsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.walletsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>[]
          }
          upsert: {
            args: Prisma.walletsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$walletsPayload>
          }
          aggregate: {
            args: Prisma.WalletsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallets>
          }
          groupBy: {
            args: Prisma.walletsGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletsGroupByOutputType>[]
          }
          count: {
            args: Prisma.walletsCountArgs<ExtArgs>
            result: $Utils.Optional<WalletsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    investments?: investmentsOmit
    transactions?: transactionsOmit
    users?: usersOmit
    wallets?: walletsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    investments: number
    transactions: number
    other_users: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investments?: boolean | UsersCountOutputTypeCountInvestmentsArgs
    transactions?: boolean | UsersCountOutputTypeCountTransactionsArgs
    other_users?: boolean | UsersCountOutputTypeCountOther_usersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountInvestmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: investmentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountOther_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model investments
   */

  export type AggregateInvestments = {
    _count: InvestmentsCountAggregateOutputType | null
    _avg: InvestmentsAvgAggregateOutputType | null
    _sum: InvestmentsSumAggregateOutputType | null
    _min: InvestmentsMinAggregateOutputType | null
    _max: InvestmentsMaxAggregateOutputType | null
  }

  export type InvestmentsAvgAggregateOutputType = {
    amount: Decimal | null
    monthly_profit_rate: Decimal | null
  }

  export type InvestmentsSumAggregateOutputType = {
    amount: Decimal | null
    monthly_profit_rate: Decimal | null
  }

  export type InvestmentsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: Decimal | null
    package_name: string | null
    monthly_profit_rate: Decimal | null
    status: string | null
    start_date: Date | null
    unlock_date: Date | null
  }

  export type InvestmentsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: Decimal | null
    package_name: string | null
    monthly_profit_rate: Decimal | null
    status: string | null
    start_date: Date | null
    unlock_date: Date | null
  }

  export type InvestmentsCountAggregateOutputType = {
    id: number
    user_id: number
    amount: number
    package_name: number
    monthly_profit_rate: number
    status: number
    start_date: number
    unlock_date: number
    _all: number
  }


  export type InvestmentsAvgAggregateInputType = {
    amount?: true
    monthly_profit_rate?: true
  }

  export type InvestmentsSumAggregateInputType = {
    amount?: true
    monthly_profit_rate?: true
  }

  export type InvestmentsMinAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    package_name?: true
    monthly_profit_rate?: true
    status?: true
    start_date?: true
    unlock_date?: true
  }

  export type InvestmentsMaxAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    package_name?: true
    monthly_profit_rate?: true
    status?: true
    start_date?: true
    unlock_date?: true
  }

  export type InvestmentsCountAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    package_name?: true
    monthly_profit_rate?: true
    status?: true
    start_date?: true
    unlock_date?: true
    _all?: true
  }

  export type InvestmentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which investments to aggregate.
     */
    where?: investmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of investments to fetch.
     */
    orderBy?: investmentsOrderByWithRelationInput | investmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: investmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned investments
    **/
    _count?: true | InvestmentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestmentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestmentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestmentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestmentsMaxAggregateInputType
  }

  export type GetInvestmentsAggregateType<T extends InvestmentsAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestments[P]>
      : GetScalarType<T[P], AggregateInvestments[P]>
  }




  export type investmentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: investmentsWhereInput
    orderBy?: investmentsOrderByWithAggregationInput | investmentsOrderByWithAggregationInput[]
    by: InvestmentsScalarFieldEnum[] | InvestmentsScalarFieldEnum
    having?: investmentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestmentsCountAggregateInputType | true
    _avg?: InvestmentsAvgAggregateInputType
    _sum?: InvestmentsSumAggregateInputType
    _min?: InvestmentsMinAggregateInputType
    _max?: InvestmentsMaxAggregateInputType
  }

  export type InvestmentsGroupByOutputType = {
    id: string
    user_id: string
    amount: Decimal
    package_name: string
    monthly_profit_rate: Decimal
    status: string
    start_date: Date
    unlock_date: Date
    _count: InvestmentsCountAggregateOutputType | null
    _avg: InvestmentsAvgAggregateOutputType | null
    _sum: InvestmentsSumAggregateOutputType | null
    _min: InvestmentsMinAggregateOutputType | null
    _max: InvestmentsMaxAggregateOutputType | null
  }

  type GetInvestmentsGroupByPayload<T extends investmentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestmentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestmentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestmentsGroupByOutputType[P]>
            : GetScalarType<T[P], InvestmentsGroupByOutputType[P]>
        }
      >
    >


  export type investmentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    package_name?: boolean
    monthly_profit_rate?: boolean
    status?: boolean
    start_date?: boolean
    unlock_date?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investments"]>

  export type investmentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    package_name?: boolean
    monthly_profit_rate?: boolean
    status?: boolean
    start_date?: boolean
    unlock_date?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investments"]>

  export type investmentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    package_name?: boolean
    monthly_profit_rate?: boolean
    status?: boolean
    start_date?: boolean
    unlock_date?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investments"]>

  export type investmentsSelectScalar = {
    id?: boolean
    user_id?: boolean
    amount?: boolean
    package_name?: boolean
    monthly_profit_rate?: boolean
    status?: boolean
    start_date?: boolean
    unlock_date?: boolean
  }

  export type investmentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "amount" | "package_name" | "monthly_profit_rate" | "status" | "start_date" | "unlock_date", ExtArgs["result"]["investments"]>
  export type investmentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type investmentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type investmentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $investmentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "investments"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      amount: Prisma.Decimal
      package_name: string
      monthly_profit_rate: Prisma.Decimal
      status: string
      start_date: Date
      unlock_date: Date
    }, ExtArgs["result"]["investments"]>
    composites: {}
  }

  type investmentsGetPayload<S extends boolean | null | undefined | investmentsDefaultArgs> = $Result.GetResult<Prisma.$investmentsPayload, S>

  type investmentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<investmentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestmentsCountAggregateInputType | true
    }

  export interface investmentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['investments'], meta: { name: 'investments' } }
    /**
     * Find zero or one Investments that matches the filter.
     * @param {investmentsFindUniqueArgs} args - Arguments to find a Investments
     * @example
     * // Get one Investments
     * const investments = await prisma.investments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends investmentsFindUniqueArgs>(args: SelectSubset<T, investmentsFindUniqueArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {investmentsFindUniqueOrThrowArgs} args - Arguments to find a Investments
     * @example
     * // Get one Investments
     * const investments = await prisma.investments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends investmentsFindUniqueOrThrowArgs>(args: SelectSubset<T, investmentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsFindFirstArgs} args - Arguments to find a Investments
     * @example
     * // Get one Investments
     * const investments = await prisma.investments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends investmentsFindFirstArgs>(args?: SelectSubset<T, investmentsFindFirstArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsFindFirstOrThrowArgs} args - Arguments to find a Investments
     * @example
     * // Get one Investments
     * const investments = await prisma.investments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends investmentsFindFirstOrThrowArgs>(args?: SelectSubset<T, investmentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investments
     * const investments = await prisma.investments.findMany()
     * 
     * // Get first 10 Investments
     * const investments = await prisma.investments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investmentsWithIdOnly = await prisma.investments.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends investmentsFindManyArgs>(args?: SelectSubset<T, investmentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investments.
     * @param {investmentsCreateArgs} args - Arguments to create a Investments.
     * @example
     * // Create one Investments
     * const Investments = await prisma.investments.create({
     *   data: {
     *     // ... data to create a Investments
     *   }
     * })
     * 
     */
    create<T extends investmentsCreateArgs>(args: SelectSubset<T, investmentsCreateArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investments.
     * @param {investmentsCreateManyArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investments = await prisma.investments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends investmentsCreateManyArgs>(args?: SelectSubset<T, investmentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investments and returns the data saved in the database.
     * @param {investmentsCreateManyAndReturnArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investments = await prisma.investments.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investments and only return the `id`
     * const investmentsWithIdOnly = await prisma.investments.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends investmentsCreateManyAndReturnArgs>(args?: SelectSubset<T, investmentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Investments.
     * @param {investmentsDeleteArgs} args - Arguments to delete one Investments.
     * @example
     * // Delete one Investments
     * const Investments = await prisma.investments.delete({
     *   where: {
     *     // ... filter to delete one Investments
     *   }
     * })
     * 
     */
    delete<T extends investmentsDeleteArgs>(args: SelectSubset<T, investmentsDeleteArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investments.
     * @param {investmentsUpdateArgs} args - Arguments to update one Investments.
     * @example
     * // Update one Investments
     * const investments = await prisma.investments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends investmentsUpdateArgs>(args: SelectSubset<T, investmentsUpdateArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investments.
     * @param {investmentsDeleteManyArgs} args - Arguments to filter Investments to delete.
     * @example
     * // Delete a few Investments
     * const { count } = await prisma.investments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends investmentsDeleteManyArgs>(args?: SelectSubset<T, investmentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investments
     * const investments = await prisma.investments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends investmentsUpdateManyArgs>(args: SelectSubset<T, investmentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments and returns the data updated in the database.
     * @param {investmentsUpdateManyAndReturnArgs} args - Arguments to update many Investments.
     * @example
     * // Update many Investments
     * const investments = await prisma.investments.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Investments and only return the `id`
     * const investmentsWithIdOnly = await prisma.investments.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends investmentsUpdateManyAndReturnArgs>(args: SelectSubset<T, investmentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Investments.
     * @param {investmentsUpsertArgs} args - Arguments to update or create a Investments.
     * @example
     * // Update or create a Investments
     * const investments = await prisma.investments.upsert({
     *   create: {
     *     // ... data to create a Investments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investments we want to update
     *   }
     * })
     */
    upsert<T extends investmentsUpsertArgs>(args: SelectSubset<T, investmentsUpsertArgs<ExtArgs>>): Prisma__investmentsClient<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsCountArgs} args - Arguments to filter Investments to count.
     * @example
     * // Count the number of Investments
     * const count = await prisma.investments.count({
     *   where: {
     *     // ... the filter for the Investments we want to count
     *   }
     * })
    **/
    count<T extends investmentsCountArgs>(
      args?: Subset<T, investmentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestmentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvestmentsAggregateArgs>(args: Subset<T, InvestmentsAggregateArgs>): Prisma.PrismaPromise<GetInvestmentsAggregateType<T>>

    /**
     * Group by Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {investmentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends investmentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: investmentsGroupByArgs['orderBy'] }
        : { orderBy?: investmentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, investmentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestmentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the investments model
   */
  readonly fields: investmentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for investments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__investmentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the investments model
   */
  interface investmentsFieldRefs {
    readonly id: FieldRef<"investments", 'String'>
    readonly user_id: FieldRef<"investments", 'String'>
    readonly amount: FieldRef<"investments", 'Decimal'>
    readonly package_name: FieldRef<"investments", 'String'>
    readonly monthly_profit_rate: FieldRef<"investments", 'Decimal'>
    readonly status: FieldRef<"investments", 'String'>
    readonly start_date: FieldRef<"investments", 'DateTime'>
    readonly unlock_date: FieldRef<"investments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * investments findUnique
   */
  export type investmentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter, which investments to fetch.
     */
    where: investmentsWhereUniqueInput
  }

  /**
   * investments findUniqueOrThrow
   */
  export type investmentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter, which investments to fetch.
     */
    where: investmentsWhereUniqueInput
  }

  /**
   * investments findFirst
   */
  export type investmentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter, which investments to fetch.
     */
    where?: investmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of investments to fetch.
     */
    orderBy?: investmentsOrderByWithRelationInput | investmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for investments.
     */
    cursor?: investmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of investments.
     */
    distinct?: InvestmentsScalarFieldEnum | InvestmentsScalarFieldEnum[]
  }

  /**
   * investments findFirstOrThrow
   */
  export type investmentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter, which investments to fetch.
     */
    where?: investmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of investments to fetch.
     */
    orderBy?: investmentsOrderByWithRelationInput | investmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for investments.
     */
    cursor?: investmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of investments.
     */
    distinct?: InvestmentsScalarFieldEnum | InvestmentsScalarFieldEnum[]
  }

  /**
   * investments findMany
   */
  export type investmentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter, which investments to fetch.
     */
    where?: investmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of investments to fetch.
     */
    orderBy?: investmentsOrderByWithRelationInput | investmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing investments.
     */
    cursor?: investmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` investments.
     */
    skip?: number
    distinct?: InvestmentsScalarFieldEnum | InvestmentsScalarFieldEnum[]
  }

  /**
   * investments create
   */
  export type investmentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * The data needed to create a investments.
     */
    data: XOR<investmentsCreateInput, investmentsUncheckedCreateInput>
  }

  /**
   * investments createMany
   */
  export type investmentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many investments.
     */
    data: investmentsCreateManyInput | investmentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * investments createManyAndReturn
   */
  export type investmentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * The data used to create many investments.
     */
    data: investmentsCreateManyInput | investmentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * investments update
   */
  export type investmentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * The data needed to update a investments.
     */
    data: XOR<investmentsUpdateInput, investmentsUncheckedUpdateInput>
    /**
     * Choose, which investments to update.
     */
    where: investmentsWhereUniqueInput
  }

  /**
   * investments updateMany
   */
  export type investmentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update investments.
     */
    data: XOR<investmentsUpdateManyMutationInput, investmentsUncheckedUpdateManyInput>
    /**
     * Filter which investments to update
     */
    where?: investmentsWhereInput
    /**
     * Limit how many investments to update.
     */
    limit?: number
  }

  /**
   * investments updateManyAndReturn
   */
  export type investmentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * The data used to update investments.
     */
    data: XOR<investmentsUpdateManyMutationInput, investmentsUncheckedUpdateManyInput>
    /**
     * Filter which investments to update
     */
    where?: investmentsWhereInput
    /**
     * Limit how many investments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * investments upsert
   */
  export type investmentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * The filter to search for the investments to update in case it exists.
     */
    where: investmentsWhereUniqueInput
    /**
     * In case the investments found by the `where` argument doesn't exist, create a new investments with this data.
     */
    create: XOR<investmentsCreateInput, investmentsUncheckedCreateInput>
    /**
     * In case the investments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<investmentsUpdateInput, investmentsUncheckedUpdateInput>
  }

  /**
   * investments delete
   */
  export type investmentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    /**
     * Filter which investments to delete.
     */
    where: investmentsWhereUniqueInput
  }

  /**
   * investments deleteMany
   */
  export type investmentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which investments to delete
     */
    where?: investmentsWhereInput
    /**
     * Limit how many investments to delete.
     */
    limit?: number
  }

  /**
   * investments without action
   */
  export type investmentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
  }


  /**
   * Model transactions
   */

  export type AggregateTransactions = {
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  export type TransactionsAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionsSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: Decimal | null
    type: string | null
    income_source: string | null
    description: string | null
    timestamp: Date | null
  }

  export type TransactionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: Decimal | null
    type: string | null
    income_source: string | null
    description: string | null
    timestamp: Date | null
  }

  export type TransactionsCountAggregateOutputType = {
    id: number
    user_id: number
    amount: number
    type: number
    income_source: number
    description: number
    timestamp: number
    _all: number
  }


  export type TransactionsAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionsSumAggregateInputType = {
    amount?: true
  }

  export type TransactionsMinAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    type?: true
    income_source?: true
    description?: true
    timestamp?: true
  }

  export type TransactionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    type?: true
    income_source?: true
    description?: true
    timestamp?: true
  }

  export type TransactionsCountAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    type?: true
    income_source?: true
    description?: true
    timestamp?: true
    _all?: true
  }

  export type TransactionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to aggregate.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transactions
    **/
    _count?: true | TransactionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionsMaxAggregateInputType
  }

  export type GetTransactionsAggregateType<T extends TransactionsAggregateArgs> = {
        [P in keyof T & keyof AggregateTransactions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransactions[P]>
      : GetScalarType<T[P], AggregateTransactions[P]>
  }




  export type transactionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithAggregationInput | transactionsOrderByWithAggregationInput[]
    by: TransactionsScalarFieldEnum[] | TransactionsScalarFieldEnum
    having?: transactionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionsCountAggregateInputType | true
    _avg?: TransactionsAvgAggregateInputType
    _sum?: TransactionsSumAggregateInputType
    _min?: TransactionsMinAggregateInputType
    _max?: TransactionsMaxAggregateInputType
  }

  export type TransactionsGroupByOutputType = {
    id: string
    user_id: string
    amount: Decimal
    type: string
    income_source: string
    description: string | null
    timestamp: Date
    _count: TransactionsCountAggregateOutputType | null
    _avg: TransactionsAvgAggregateOutputType | null
    _sum: TransactionsSumAggregateOutputType | null
    _min: TransactionsMinAggregateOutputType | null
    _max: TransactionsMaxAggregateOutputType | null
  }

  type GetTransactionsGroupByPayload<T extends transactionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionsGroupByOutputType[P]>
        }
      >
    >


  export type transactionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    type?: boolean
    income_source?: boolean
    description?: boolean
    timestamp?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    type?: boolean
    income_source?: boolean
    description?: boolean
    timestamp?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    type?: boolean
    income_source?: boolean
    description?: boolean
    timestamp?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transactions"]>

  export type transactionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    amount?: boolean
    type?: boolean
    income_source?: boolean
    description?: boolean
    timestamp?: boolean
  }

  export type transactionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "amount" | "type" | "income_source" | "description" | "timestamp", ExtArgs["result"]["transactions"]>
  export type transactionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type transactionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type transactionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $transactionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transactions"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      amount: Prisma.Decimal
      type: string
      income_source: string
      description: string | null
      timestamp: Date
    }, ExtArgs["result"]["transactions"]>
    composites: {}
  }

  type transactionsGetPayload<S extends boolean | null | undefined | transactionsDefaultArgs> = $Result.GetResult<Prisma.$transactionsPayload, S>

  type transactionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<transactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionsCountAggregateInputType | true
    }

  export interface transactionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transactions'], meta: { name: 'transactions' } }
    /**
     * Find zero or one Transactions that matches the filter.
     * @param {transactionsFindUniqueArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transactionsFindUniqueArgs>(args: SelectSubset<T, transactionsFindUniqueArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transactions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {transactionsFindUniqueOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transactionsFindUniqueOrThrowArgs>(args: SelectSubset<T, transactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transactionsFindFirstArgs>(args?: SelectSubset<T, transactionsFindFirstArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transactions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindFirstOrThrowArgs} args - Arguments to find a Transactions
     * @example
     * // Get one Transactions
     * const transactions = await prisma.transactions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transactionsFindFirstOrThrowArgs>(args?: SelectSubset<T, transactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transactions.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transactions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionsWithIdOnly = await prisma.transactions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends transactionsFindManyArgs>(args?: SelectSubset<T, transactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transactions.
     * @param {transactionsCreateArgs} args - Arguments to create a Transactions.
     * @example
     * // Create one Transactions
     * const Transactions = await prisma.transactions.create({
     *   data: {
     *     // ... data to create a Transactions
     *   }
     * })
     * 
     */
    create<T extends transactionsCreateArgs>(args: SelectSubset<T, transactionsCreateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {transactionsCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transactions = await prisma.transactions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transactionsCreateManyArgs>(args?: SelectSubset<T, transactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {transactionsCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transactions = await prisma.transactions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionsWithIdOnly = await prisma.transactions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends transactionsCreateManyAndReturnArgs>(args?: SelectSubset<T, transactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transactions.
     * @param {transactionsDeleteArgs} args - Arguments to delete one Transactions.
     * @example
     * // Delete one Transactions
     * const Transactions = await prisma.transactions.delete({
     *   where: {
     *     // ... filter to delete one Transactions
     *   }
     * })
     * 
     */
    delete<T extends transactionsDeleteArgs>(args: SelectSubset<T, transactionsDeleteArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transactions.
     * @param {transactionsUpdateArgs} args - Arguments to update one Transactions.
     * @example
     * // Update one Transactions
     * const transactions = await prisma.transactions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transactionsUpdateArgs>(args: SelectSubset<T, transactionsUpdateArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {transactionsDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transactions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transactionsDeleteManyArgs>(args?: SelectSubset<T, transactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transactions = await prisma.transactions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transactionsUpdateManyArgs>(args: SelectSubset<T, transactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {transactionsUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transactions = await prisma.transactions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionsWithIdOnly = await prisma.transactions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends transactionsUpdateManyAndReturnArgs>(args: SelectSubset<T, transactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transactions.
     * @param {transactionsUpsertArgs} args - Arguments to update or create a Transactions.
     * @example
     * // Update or create a Transactions
     * const transactions = await prisma.transactions.upsert({
     *   create: {
     *     // ... data to create a Transactions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transactions we want to update
     *   }
     * })
     */
    upsert<T extends transactionsUpsertArgs>(args: SelectSubset<T, transactionsUpsertArgs<ExtArgs>>): Prisma__transactionsClient<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transactions.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends transactionsCountArgs>(
      args?: Subset<T, transactionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionsAggregateArgs>(args: Subset<T, TransactionsAggregateArgs>): Prisma.PrismaPromise<GetTransactionsAggregateType<T>>

    /**
     * Group by Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transactionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends transactionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transactionsGroupByArgs['orderBy'] }
        : { orderBy?: transactionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transactions model
   */
  readonly fields: transactionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transactions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transactionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the transactions model
   */
  interface transactionsFieldRefs {
    readonly id: FieldRef<"transactions", 'String'>
    readonly user_id: FieldRef<"transactions", 'String'>
    readonly amount: FieldRef<"transactions", 'Decimal'>
    readonly type: FieldRef<"transactions", 'String'>
    readonly income_source: FieldRef<"transactions", 'String'>
    readonly description: FieldRef<"transactions", 'String'>
    readonly timestamp: FieldRef<"transactions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * transactions findUnique
   */
  export type transactionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findUniqueOrThrow
   */
  export type transactionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions findFirst
   */
  export type transactionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findFirstOrThrow
   */
  export type transactionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transactions.
     */
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions findMany
   */
  export type transactionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter, which transactions to fetch.
     */
    where?: transactionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transactions to fetch.
     */
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transactions.
     */
    cursor?: transactionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transactions.
     */
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * transactions create
   */
  export type transactionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to create a transactions.
     */
    data: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
  }

  /**
   * transactions createMany
   */
  export type transactionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transactions.
     */
    data: transactionsCreateManyInput | transactionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * transactions createManyAndReturn
   */
  export type transactionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * The data used to create many transactions.
     */
    data: transactionsCreateManyInput | transactionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * transactions update
   */
  export type transactionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The data needed to update a transactions.
     */
    data: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
    /**
     * Choose, which transactions to update.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions updateMany
   */
  export type transactionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
  }

  /**
   * transactions updateManyAndReturn
   */
  export type transactionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * The data used to update transactions.
     */
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyInput>
    /**
     * Filter which transactions to update
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * transactions upsert
   */
  export type transactionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * The filter to search for the transactions to update in case it exists.
     */
    where: transactionsWhereUniqueInput
    /**
     * In case the transactions found by the `where` argument doesn't exist, create a new transactions with this data.
     */
    create: XOR<transactionsCreateInput, transactionsUncheckedCreateInput>
    /**
     * In case the transactions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transactionsUpdateInput, transactionsUncheckedUpdateInput>
  }

  /**
   * transactions delete
   */
  export type transactionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    /**
     * Filter which transactions to delete.
     */
    where: transactionsWhereUniqueInput
  }

  /**
   * transactions deleteMany
   */
  export type transactionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transactions to delete
     */
    where?: transactionsWhereInput
    /**
     * Limit how many transactions to delete.
     */
    limit?: number
  }

  /**
   * transactions without action
   */
  export type transactionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    full_name: string | null
    email: string | null
    password_hash: string | null
    referral_code: string | null
    sponsor_id: string | null
    position_in_sponsor_tree: string | null
    role: string | null
    googleId: string | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    full_name: string | null
    email: string | null
    password_hash: string | null
    referral_code: string | null
    sponsor_id: string | null
    position_in_sponsor_tree: string | null
    role: string | null
    googleId: string | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    full_name: number
    email: number
    password_hash: number
    referral_code: number
    sponsor_id: number
    position_in_sponsor_tree: number
    role: number
    googleId: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    password_hash?: true
    referral_code?: true
    sponsor_id?: true
    position_in_sponsor_tree?: true
    role?: true
    googleId?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    password_hash?: true
    referral_code?: true
    sponsor_id?: true
    position_in_sponsor_tree?: true
    role?: true
    googleId?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    full_name?: true
    email?: true
    password_hash?: true
    referral_code?: true
    sponsor_id?: true
    position_in_sponsor_tree?: true
    role?: true
    googleId?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    full_name: string
    email: string
    password_hash: string | null
    referral_code: string
    sponsor_id: string | null
    position_in_sponsor_tree: string | null
    role: string
    googleId: string | null
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    referral_code?: boolean
    sponsor_id?: boolean
    position_in_sponsor_tree?: boolean
    role?: boolean
    googleId?: boolean
    created_at?: boolean
    investments?: boolean | users$investmentsArgs<ExtArgs>
    transactions?: boolean | users$transactionsArgs<ExtArgs>
    users?: boolean | users$usersArgs<ExtArgs>
    other_users?: boolean | users$other_usersArgs<ExtArgs>
    wallets?: boolean | users$walletsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    referral_code?: boolean
    sponsor_id?: boolean
    position_in_sponsor_tree?: boolean
    role?: boolean
    googleId?: boolean
    created_at?: boolean
    users?: boolean | users$usersArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    referral_code?: boolean
    sponsor_id?: boolean
    position_in_sponsor_tree?: boolean
    role?: boolean
    googleId?: boolean
    created_at?: boolean
    users?: boolean | users$usersArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    referral_code?: boolean
    sponsor_id?: boolean
    position_in_sponsor_tree?: boolean
    role?: boolean
    googleId?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "full_name" | "email" | "password_hash" | "referral_code" | "sponsor_id" | "position_in_sponsor_tree" | "role" | "googleId" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investments?: boolean | users$investmentsArgs<ExtArgs>
    transactions?: boolean | users$transactionsArgs<ExtArgs>
    users?: boolean | users$usersArgs<ExtArgs>
    other_users?: boolean | users$other_usersArgs<ExtArgs>
    wallets?: boolean | users$walletsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | users$usersArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | users$usersArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      investments: Prisma.$investmentsPayload<ExtArgs>[]
      transactions: Prisma.$transactionsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs> | null
      other_users: Prisma.$usersPayload<ExtArgs>[]
      wallets: Prisma.$walletsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      full_name: string
      email: string
      password_hash: string | null
      referral_code: string
      sponsor_id: string | null
      position_in_sponsor_tree: string | null
      role: string
      googleId: string | null
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    investments<T extends users$investmentsArgs<ExtArgs> = {}>(args?: Subset<T, users$investmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$investmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends users$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, users$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends users$usersArgs<ExtArgs> = {}>(args?: Subset<T, users$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_users<T extends users$other_usersArgs<ExtArgs> = {}>(args?: Subset<T, users$other_usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallets<T extends users$walletsArgs<ExtArgs> = {}>(args?: Subset<T, users$walletsArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly full_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly referral_code: FieldRef<"users", 'String'>
    readonly sponsor_id: FieldRef<"users", 'String'>
    readonly position_in_sponsor_tree: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly googleId: FieldRef<"users", 'String'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.investments
   */
  export type users$investmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the investments
     */
    select?: investmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the investments
     */
    omit?: investmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: investmentsInclude<ExtArgs> | null
    where?: investmentsWhereInput
    orderBy?: investmentsOrderByWithRelationInput | investmentsOrderByWithRelationInput[]
    cursor?: investmentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentsScalarFieldEnum | InvestmentsScalarFieldEnum[]
  }

  /**
   * users.transactions
   */
  export type users$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transactions
     */
    select?: transactionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transactions
     */
    omit?: transactionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transactionsInclude<ExtArgs> | null
    where?: transactionsWhereInput
    orderBy?: transactionsOrderByWithRelationInput | transactionsOrderByWithRelationInput[]
    cursor?: transactionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionsScalarFieldEnum | TransactionsScalarFieldEnum[]
  }

  /**
   * users.users
   */
  export type users$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * users.other_users
   */
  export type users$other_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users.wallets
   */
  export type users$walletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    where?: walletsWhereInput
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model wallets
   */

  export type AggregateWallets = {
    _count: WalletsCountAggregateOutputType | null
    _avg: WalletsAvgAggregateOutputType | null
    _sum: WalletsSumAggregateOutputType | null
    _min: WalletsMinAggregateOutputType | null
    _max: WalletsMaxAggregateOutputType | null
  }

  export type WalletsAvgAggregateOutputType = {
    balance: Decimal | null
  }

  export type WalletsSumAggregateOutputType = {
    balance: Decimal | null
  }

  export type WalletsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    balance: Decimal | null
  }

  export type WalletsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    balance: Decimal | null
  }

  export type WalletsCountAggregateOutputType = {
    id: number
    user_id: number
    balance: number
    _all: number
  }


  export type WalletsAvgAggregateInputType = {
    balance?: true
  }

  export type WalletsSumAggregateInputType = {
    balance?: true
  }

  export type WalletsMinAggregateInputType = {
    id?: true
    user_id?: true
    balance?: true
  }

  export type WalletsMaxAggregateInputType = {
    id?: true
    user_id?: true
    balance?: true
  }

  export type WalletsCountAggregateInputType = {
    id?: true
    user_id?: true
    balance?: true
    _all?: true
  }

  export type WalletsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wallets to aggregate.
     */
    where?: walletsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletsOrderByWithRelationInput | walletsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: walletsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned wallets
    **/
    _count?: true | WalletsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletsMaxAggregateInputType
  }

  export type GetWalletsAggregateType<T extends WalletsAggregateArgs> = {
        [P in keyof T & keyof AggregateWallets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallets[P]>
      : GetScalarType<T[P], AggregateWallets[P]>
  }




  export type walletsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: walletsWhereInput
    orderBy?: walletsOrderByWithAggregationInput | walletsOrderByWithAggregationInput[]
    by: WalletsScalarFieldEnum[] | WalletsScalarFieldEnum
    having?: walletsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletsCountAggregateInputType | true
    _avg?: WalletsAvgAggregateInputType
    _sum?: WalletsSumAggregateInputType
    _min?: WalletsMinAggregateInputType
    _max?: WalletsMaxAggregateInputType
  }

  export type WalletsGroupByOutputType = {
    id: string
    user_id: string
    balance: Decimal
    _count: WalletsCountAggregateOutputType | null
    _avg: WalletsAvgAggregateOutputType | null
    _sum: WalletsSumAggregateOutputType | null
    _min: WalletsMinAggregateOutputType | null
    _max: WalletsMaxAggregateOutputType | null
  }

  type GetWalletsGroupByPayload<T extends walletsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletsGroupByOutputType[P]>
            : GetScalarType<T[P], WalletsGroupByOutputType[P]>
        }
      >
    >


  export type walletsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    balance?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallets"]>

  export type walletsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    balance?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallets"]>

  export type walletsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    balance?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallets"]>

  export type walletsSelectScalar = {
    id?: boolean
    user_id?: boolean
    balance?: boolean
  }

  export type walletsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "balance", ExtArgs["result"]["wallets"]>
  export type walletsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type walletsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type walletsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $walletsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "wallets"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      balance: Prisma.Decimal
    }, ExtArgs["result"]["wallets"]>
    composites: {}
  }

  type walletsGetPayload<S extends boolean | null | undefined | walletsDefaultArgs> = $Result.GetResult<Prisma.$walletsPayload, S>

  type walletsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<walletsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletsCountAggregateInputType | true
    }

  export interface walletsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['wallets'], meta: { name: 'wallets' } }
    /**
     * Find zero or one Wallets that matches the filter.
     * @param {walletsFindUniqueArgs} args - Arguments to find a Wallets
     * @example
     * // Get one Wallets
     * const wallets = await prisma.wallets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends walletsFindUniqueArgs>(args: SelectSubset<T, walletsFindUniqueArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallets that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {walletsFindUniqueOrThrowArgs} args - Arguments to find a Wallets
     * @example
     * // Get one Wallets
     * const wallets = await prisma.wallets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends walletsFindUniqueOrThrowArgs>(args: SelectSubset<T, walletsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsFindFirstArgs} args - Arguments to find a Wallets
     * @example
     * // Get one Wallets
     * const wallets = await prisma.wallets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends walletsFindFirstArgs>(args?: SelectSubset<T, walletsFindFirstArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsFindFirstOrThrowArgs} args - Arguments to find a Wallets
     * @example
     * // Get one Wallets
     * const wallets = await prisma.wallets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends walletsFindFirstOrThrowArgs>(args?: SelectSubset<T, walletsFindFirstOrThrowArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallets.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallets.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletsWithIdOnly = await prisma.wallets.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends walletsFindManyArgs>(args?: SelectSubset<T, walletsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallets.
     * @param {walletsCreateArgs} args - Arguments to create a Wallets.
     * @example
     * // Create one Wallets
     * const Wallets = await prisma.wallets.create({
     *   data: {
     *     // ... data to create a Wallets
     *   }
     * })
     * 
     */
    create<T extends walletsCreateArgs>(args: SelectSubset<T, walletsCreateArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {walletsCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallets = await prisma.wallets.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends walletsCreateManyArgs>(args?: SelectSubset<T, walletsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {walletsCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallets = await prisma.wallets.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletsWithIdOnly = await prisma.wallets.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends walletsCreateManyAndReturnArgs>(args?: SelectSubset<T, walletsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallets.
     * @param {walletsDeleteArgs} args - Arguments to delete one Wallets.
     * @example
     * // Delete one Wallets
     * const Wallets = await prisma.wallets.delete({
     *   where: {
     *     // ... filter to delete one Wallets
     *   }
     * })
     * 
     */
    delete<T extends walletsDeleteArgs>(args: SelectSubset<T, walletsDeleteArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallets.
     * @param {walletsUpdateArgs} args - Arguments to update one Wallets.
     * @example
     * // Update one Wallets
     * const wallets = await prisma.wallets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends walletsUpdateArgs>(args: SelectSubset<T, walletsUpdateArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {walletsDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends walletsDeleteManyArgs>(args?: SelectSubset<T, walletsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallets = await prisma.wallets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends walletsUpdateManyArgs>(args: SelectSubset<T, walletsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {walletsUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallets = await prisma.wallets.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `id`
     * const walletsWithIdOnly = await prisma.wallets.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends walletsUpdateManyAndReturnArgs>(args: SelectSubset<T, walletsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallets.
     * @param {walletsUpsertArgs} args - Arguments to update or create a Wallets.
     * @example
     * // Update or create a Wallets
     * const wallets = await prisma.wallets.upsert({
     *   create: {
     *     // ... data to create a Wallets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallets we want to update
     *   }
     * })
     */
    upsert<T extends walletsUpsertArgs>(args: SelectSubset<T, walletsUpsertArgs<ExtArgs>>): Prisma__walletsClient<$Result.GetResult<Prisma.$walletsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallets.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends walletsCountArgs>(
      args?: Subset<T, walletsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletsAggregateArgs>(args: Subset<T, WalletsAggregateArgs>): Prisma.PrismaPromise<GetWalletsAggregateType<T>>

    /**
     * Group by Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {walletsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends walletsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: walletsGroupByArgs['orderBy'] }
        : { orderBy?: walletsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, walletsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the wallets model
   */
  readonly fields: walletsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for wallets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__walletsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the wallets model
   */
  interface walletsFieldRefs {
    readonly id: FieldRef<"wallets", 'String'>
    readonly user_id: FieldRef<"wallets", 'String'>
    readonly balance: FieldRef<"wallets", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * wallets findUnique
   */
  export type walletsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where: walletsWhereUniqueInput
  }

  /**
   * wallets findUniqueOrThrow
   */
  export type walletsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where: walletsWhereUniqueInput
  }

  /**
   * wallets findFirst
   */
  export type walletsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where?: walletsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletsOrderByWithRelationInput | walletsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wallets.
     */
    cursor?: walletsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wallets.
     */
    distinct?: WalletsScalarFieldEnum | WalletsScalarFieldEnum[]
  }

  /**
   * wallets findFirstOrThrow
   */
  export type walletsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where?: walletsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletsOrderByWithRelationInput | walletsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for wallets.
     */
    cursor?: walletsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of wallets.
     */
    distinct?: WalletsScalarFieldEnum | WalletsScalarFieldEnum[]
  }

  /**
   * wallets findMany
   */
  export type walletsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter, which wallets to fetch.
     */
    where?: walletsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of wallets to fetch.
     */
    orderBy?: walletsOrderByWithRelationInput | walletsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing wallets.
     */
    cursor?: walletsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` wallets.
     */
    skip?: number
    distinct?: WalletsScalarFieldEnum | WalletsScalarFieldEnum[]
  }

  /**
   * wallets create
   */
  export type walletsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * The data needed to create a wallets.
     */
    data: XOR<walletsCreateInput, walletsUncheckedCreateInput>
  }

  /**
   * wallets createMany
   */
  export type walletsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many wallets.
     */
    data: walletsCreateManyInput | walletsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * wallets createManyAndReturn
   */
  export type walletsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * The data used to create many wallets.
     */
    data: walletsCreateManyInput | walletsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * wallets update
   */
  export type walletsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * The data needed to update a wallets.
     */
    data: XOR<walletsUpdateInput, walletsUncheckedUpdateInput>
    /**
     * Choose, which wallets to update.
     */
    where: walletsWhereUniqueInput
  }

  /**
   * wallets updateMany
   */
  export type walletsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update wallets.
     */
    data: XOR<walletsUpdateManyMutationInput, walletsUncheckedUpdateManyInput>
    /**
     * Filter which wallets to update
     */
    where?: walletsWhereInput
    /**
     * Limit how many wallets to update.
     */
    limit?: number
  }

  /**
   * wallets updateManyAndReturn
   */
  export type walletsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * The data used to update wallets.
     */
    data: XOR<walletsUpdateManyMutationInput, walletsUncheckedUpdateManyInput>
    /**
     * Filter which wallets to update
     */
    where?: walletsWhereInput
    /**
     * Limit how many wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * wallets upsert
   */
  export type walletsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * The filter to search for the wallets to update in case it exists.
     */
    where: walletsWhereUniqueInput
    /**
     * In case the wallets found by the `where` argument doesn't exist, create a new wallets with this data.
     */
    create: XOR<walletsCreateInput, walletsUncheckedCreateInput>
    /**
     * In case the wallets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<walletsUpdateInput, walletsUncheckedUpdateInput>
  }

  /**
   * wallets delete
   */
  export type walletsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
    /**
     * Filter which wallets to delete.
     */
    where: walletsWhereUniqueInput
  }

  /**
   * wallets deleteMany
   */
  export type walletsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which wallets to delete
     */
    where?: walletsWhereInput
    /**
     * Limit how many wallets to delete.
     */
    limit?: number
  }

  /**
   * wallets without action
   */
  export type walletsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the wallets
     */
    select?: walletsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the wallets
     */
    omit?: walletsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: walletsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const InvestmentsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    amount: 'amount',
    package_name: 'package_name',
    monthly_profit_rate: 'monthly_profit_rate',
    status: 'status',
    start_date: 'start_date',
    unlock_date: 'unlock_date'
  };

  export type InvestmentsScalarFieldEnum = (typeof InvestmentsScalarFieldEnum)[keyof typeof InvestmentsScalarFieldEnum]


  export const TransactionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    amount: 'amount',
    type: 'type',
    income_source: 'income_source',
    description: 'description',
    timestamp: 'timestamp'
  };

  export type TransactionsScalarFieldEnum = (typeof TransactionsScalarFieldEnum)[keyof typeof TransactionsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    full_name: 'full_name',
    email: 'email',
    password_hash: 'password_hash',
    referral_code: 'referral_code',
    sponsor_id: 'sponsor_id',
    position_in_sponsor_tree: 'position_in_sponsor_tree',
    role: 'role',
    googleId: 'googleId',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const WalletsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    balance: 'balance'
  };

  export type WalletsScalarFieldEnum = (typeof WalletsScalarFieldEnum)[keyof typeof WalletsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type investmentsWhereInput = {
    AND?: investmentsWhereInput | investmentsWhereInput[]
    OR?: investmentsWhereInput[]
    NOT?: investmentsWhereInput | investmentsWhereInput[]
    id?: StringFilter<"investments"> | string
    user_id?: StringFilter<"investments"> | string
    amount?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    package_name?: StringFilter<"investments"> | string
    monthly_profit_rate?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"investments"> | string
    start_date?: DateTimeFilter<"investments"> | Date | string
    unlock_date?: DateTimeFilter<"investments"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type investmentsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    package_name?: SortOrder
    monthly_profit_rate?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    unlock_date?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type investmentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: investmentsWhereInput | investmentsWhereInput[]
    OR?: investmentsWhereInput[]
    NOT?: investmentsWhereInput | investmentsWhereInput[]
    user_id?: StringFilter<"investments"> | string
    amount?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    package_name?: StringFilter<"investments"> | string
    monthly_profit_rate?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"investments"> | string
    start_date?: DateTimeFilter<"investments"> | Date | string
    unlock_date?: DateTimeFilter<"investments"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type investmentsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    package_name?: SortOrder
    monthly_profit_rate?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    unlock_date?: SortOrder
    _count?: investmentsCountOrderByAggregateInput
    _avg?: investmentsAvgOrderByAggregateInput
    _max?: investmentsMaxOrderByAggregateInput
    _min?: investmentsMinOrderByAggregateInput
    _sum?: investmentsSumOrderByAggregateInput
  }

  export type investmentsScalarWhereWithAggregatesInput = {
    AND?: investmentsScalarWhereWithAggregatesInput | investmentsScalarWhereWithAggregatesInput[]
    OR?: investmentsScalarWhereWithAggregatesInput[]
    NOT?: investmentsScalarWhereWithAggregatesInput | investmentsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"investments"> | string
    user_id?: StringWithAggregatesFilter<"investments"> | string
    amount?: DecimalWithAggregatesFilter<"investments"> | Decimal | DecimalJsLike | number | string
    package_name?: StringWithAggregatesFilter<"investments"> | string
    monthly_profit_rate?: DecimalWithAggregatesFilter<"investments"> | Decimal | DecimalJsLike | number | string
    status?: StringWithAggregatesFilter<"investments"> | string
    start_date?: DateTimeWithAggregatesFilter<"investments"> | Date | string
    unlock_date?: DateTimeWithAggregatesFilter<"investments"> | Date | string
  }

  export type transactionsWhereInput = {
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    id?: StringFilter<"transactions"> | string
    user_id?: StringFilter<"transactions"> | string
    amount?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"transactions"> | string
    income_source?: StringFilter<"transactions"> | string
    description?: StringNullableFilter<"transactions"> | string | null
    timestamp?: DateTimeFilter<"transactions"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type transactionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    income_source?: SortOrder
    description?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type transactionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: transactionsWhereInput | transactionsWhereInput[]
    OR?: transactionsWhereInput[]
    NOT?: transactionsWhereInput | transactionsWhereInput[]
    user_id?: StringFilter<"transactions"> | string
    amount?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"transactions"> | string
    income_source?: StringFilter<"transactions"> | string
    description?: StringNullableFilter<"transactions"> | string | null
    timestamp?: DateTimeFilter<"transactions"> | Date | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type transactionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    income_source?: SortOrder
    description?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: transactionsCountOrderByAggregateInput
    _avg?: transactionsAvgOrderByAggregateInput
    _max?: transactionsMaxOrderByAggregateInput
    _min?: transactionsMinOrderByAggregateInput
    _sum?: transactionsSumOrderByAggregateInput
  }

  export type transactionsScalarWhereWithAggregatesInput = {
    AND?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    OR?: transactionsScalarWhereWithAggregatesInput[]
    NOT?: transactionsScalarWhereWithAggregatesInput | transactionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"transactions"> | string
    user_id?: StringWithAggregatesFilter<"transactions"> | string
    amount?: DecimalWithAggregatesFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    type?: StringWithAggregatesFilter<"transactions"> | string
    income_source?: StringWithAggregatesFilter<"transactions"> | string
    description?: StringNullableWithAggregatesFilter<"transactions"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"transactions"> | Date | string
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    full_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringNullableFilter<"users"> | string | null
    referral_code?: StringFilter<"users"> | string
    sponsor_id?: StringNullableFilter<"users"> | string | null
    position_in_sponsor_tree?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    googleId?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    investments?: InvestmentsListRelationFilter
    transactions?: TransactionsListRelationFilter
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users?: UsersListRelationFilter
    wallets?: XOR<WalletsNullableScalarRelationFilter, walletsWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    referral_code?: SortOrder
    sponsor_id?: SortOrderInput | SortOrder
    position_in_sponsor_tree?: SortOrderInput | SortOrder
    role?: SortOrder
    googleId?: SortOrderInput | SortOrder
    created_at?: SortOrder
    investments?: investmentsOrderByRelationAggregateInput
    transactions?: transactionsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    other_users?: usersOrderByRelationAggregateInput
    wallets?: walletsOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    referral_code?: string
    googleId?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    full_name?: StringFilter<"users"> | string
    password_hash?: StringNullableFilter<"users"> | string | null
    sponsor_id?: StringNullableFilter<"users"> | string | null
    position_in_sponsor_tree?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    created_at?: DateTimeFilter<"users"> | Date | string
    investments?: InvestmentsListRelationFilter
    transactions?: TransactionsListRelationFilter
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    other_users?: UsersListRelationFilter
    wallets?: XOR<WalletsNullableScalarRelationFilter, walletsWhereInput> | null
  }, "id" | "email" | "referral_code" | "googleId">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrderInput | SortOrder
    referral_code?: SortOrder
    sponsor_id?: SortOrderInput | SortOrder
    position_in_sponsor_tree?: SortOrderInput | SortOrder
    role?: SortOrder
    googleId?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    full_name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringNullableWithAggregatesFilter<"users"> | string | null
    referral_code?: StringWithAggregatesFilter<"users"> | string
    sponsor_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    position_in_sponsor_tree?: StringNullableWithAggregatesFilter<"users"> | string | null
    role?: StringWithAggregatesFilter<"users"> | string
    googleId?: StringNullableWithAggregatesFilter<"users"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type walletsWhereInput = {
    AND?: walletsWhereInput | walletsWhereInput[]
    OR?: walletsWhereInput[]
    NOT?: walletsWhereInput | walletsWhereInput[]
    id?: StringFilter<"wallets"> | string
    user_id?: StringFilter<"wallets"> | string
    balance?: DecimalFilter<"wallets"> | Decimal | DecimalJsLike | number | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type walletsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    balance?: SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type walletsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: walletsWhereInput | walletsWhereInput[]
    OR?: walletsWhereInput[]
    NOT?: walletsWhereInput | walletsWhereInput[]
    balance?: DecimalFilter<"wallets"> | Decimal | DecimalJsLike | number | string
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "user_id">

  export type walletsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    balance?: SortOrder
    _count?: walletsCountOrderByAggregateInput
    _avg?: walletsAvgOrderByAggregateInput
    _max?: walletsMaxOrderByAggregateInput
    _min?: walletsMinOrderByAggregateInput
    _sum?: walletsSumOrderByAggregateInput
  }

  export type walletsScalarWhereWithAggregatesInput = {
    AND?: walletsScalarWhereWithAggregatesInput | walletsScalarWhereWithAggregatesInput[]
    OR?: walletsScalarWhereWithAggregatesInput[]
    NOT?: walletsScalarWhereWithAggregatesInput | walletsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"wallets"> | string
    user_id?: StringWithAggregatesFilter<"wallets"> | string
    balance?: DecimalWithAggregatesFilter<"wallets"> | Decimal | DecimalJsLike | number | string
  }

  export type investmentsCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
    users: usersCreateNestedOneWithoutInvestmentsInput
  }

  export type investmentsUncheckedCreateInput = {
    id?: string
    user_id: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
  }

  export type investmentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutInvestmentsNestedInput
  }

  export type investmentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type investmentsCreateManyInput = {
    id?: string
    user_id: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
  }

  export type investmentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type investmentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
    users: usersCreateNestedOneWithoutTransactionsInput
  }

  export type transactionsUncheckedCreateInput = {
    id?: string
    user_id: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
  }

  export type transactionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type transactionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsCreateManyInput = {
    id?: string
    user_id: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
  }

  export type transactionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersCreateInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsCreateNestedManyWithoutUsersInput
    transactions?: transactionsCreateNestedManyWithoutUsersInput
    users?: usersCreateNestedOneWithoutOther_usersInput
    other_users?: usersCreateNestedManyWithoutUsersInput
    wallets?: walletsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsUncheckedCreateNestedManyWithoutUsersInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUsersInput
    other_users?: usersUncheckedCreateNestedManyWithoutUsersInput
    wallets?: walletsUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUpdateManyWithoutUsersNestedInput
    users?: usersUpdateOneWithoutOther_usersNestedInput
    other_users?: usersUpdateManyWithoutUsersNestedInput
    wallets?: walletsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUncheckedUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUsersNestedInput
    other_users?: usersUncheckedUpdateManyWithoutUsersNestedInput
    wallets?: walletsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type walletsCreateInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
    users: usersCreateNestedOneWithoutWalletsInput
  }

  export type walletsUncheckedCreateInput = {
    id?: string
    user_id: string
    balance?: Decimal | DecimalJsLike | number | string
  }

  export type walletsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    users?: usersUpdateOneRequiredWithoutWalletsNestedInput
  }

  export type walletsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletsCreateManyInput = {
    id?: string
    user_id: string
    balance?: Decimal | DecimalJsLike | number | string
  }

  export type walletsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type investmentsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    package_name?: SortOrder
    monthly_profit_rate?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    unlock_date?: SortOrder
  }

  export type investmentsAvgOrderByAggregateInput = {
    amount?: SortOrder
    monthly_profit_rate?: SortOrder
  }

  export type investmentsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    package_name?: SortOrder
    monthly_profit_rate?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    unlock_date?: SortOrder
  }

  export type investmentsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    package_name?: SortOrder
    monthly_profit_rate?: SortOrder
    status?: SortOrder
    start_date?: SortOrder
    unlock_date?: SortOrder
  }

  export type investmentsSumOrderByAggregateInput = {
    amount?: SortOrder
    monthly_profit_rate?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type transactionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    income_source?: SortOrder
    description?: SortOrder
    timestamp?: SortOrder
  }

  export type transactionsAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type transactionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    income_source?: SortOrder
    description?: SortOrder
    timestamp?: SortOrder
  }

  export type transactionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    income_source?: SortOrder
    description?: SortOrder
    timestamp?: SortOrder
  }

  export type transactionsSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type InvestmentsListRelationFilter = {
    every?: investmentsWhereInput
    some?: investmentsWhereInput
    none?: investmentsWhereInput
  }

  export type TransactionsListRelationFilter = {
    every?: transactionsWhereInput
    some?: transactionsWhereInput
    none?: transactionsWhereInput
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type WalletsNullableScalarRelationFilter = {
    is?: walletsWhereInput | null
    isNot?: walletsWhereInput | null
  }

  export type investmentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type transactionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    referral_code?: SortOrder
    sponsor_id?: SortOrder
    position_in_sponsor_tree?: SortOrder
    role?: SortOrder
    googleId?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    referral_code?: SortOrder
    sponsor_id?: SortOrder
    position_in_sponsor_tree?: SortOrder
    role?: SortOrder
    googleId?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    referral_code?: SortOrder
    sponsor_id?: SortOrder
    position_in_sponsor_tree?: SortOrder
    role?: SortOrder
    googleId?: SortOrder
    created_at?: SortOrder
  }

  export type walletsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    balance?: SortOrder
  }

  export type walletsAvgOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type walletsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    balance?: SortOrder
  }

  export type walletsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    balance?: SortOrder
  }

  export type walletsSumOrderByAggregateInput = {
    balance?: SortOrder
  }

  export type usersCreateNestedOneWithoutInvestmentsInput = {
    create?: XOR<usersCreateWithoutInvestmentsInput, usersUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutInvestmentsInput
    connect?: usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type usersUpdateOneRequiredWithoutInvestmentsNestedInput = {
    create?: XOR<usersCreateWithoutInvestmentsInput, usersUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutInvestmentsInput
    upsert?: usersUpsertWithoutInvestmentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutInvestmentsInput, usersUpdateWithoutInvestmentsInput>, usersUncheckedUpdateWithoutInvestmentsInput>
  }

  export type usersCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransactionsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type usersUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransactionsInput
    upsert?: usersUpsertWithoutTransactionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTransactionsInput, usersUpdateWithoutTransactionsInput>, usersUncheckedUpdateWithoutTransactionsInput>
  }

  export type investmentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput> | investmentsCreateWithoutUsersInput[] | investmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: investmentsCreateOrConnectWithoutUsersInput | investmentsCreateOrConnectWithoutUsersInput[]
    createMany?: investmentsCreateManyUsersInputEnvelope
    connect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
  }

  export type transactionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput> | transactionsCreateWithoutUsersInput[] | transactionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUsersInput | transactionsCreateOrConnectWithoutUsersInput[]
    createMany?: transactionsCreateManyUsersInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutOther_usersInput = {
    create?: XOR<usersCreateWithoutOther_usersInput, usersUncheckedCreateWithoutOther_usersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_usersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedManyWithoutUsersInput = {
    create?: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput> | usersCreateWithoutUsersInput[] | usersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsersInput | usersCreateOrConnectWithoutUsersInput[]
    createMany?: usersCreateManyUsersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type walletsCreateNestedOneWithoutUsersInput = {
    create?: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: walletsCreateOrConnectWithoutUsersInput
    connect?: walletsWhereUniqueInput
  }

  export type investmentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput> | investmentsCreateWithoutUsersInput[] | investmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: investmentsCreateOrConnectWithoutUsersInput | investmentsCreateOrConnectWithoutUsersInput[]
    createMany?: investmentsCreateManyUsersInputEnvelope
    connect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
  }

  export type transactionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput> | transactionsCreateWithoutUsersInput[] | transactionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUsersInput | transactionsCreateOrConnectWithoutUsersInput[]
    createMany?: transactionsCreateManyUsersInputEnvelope
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput> | usersCreateWithoutUsersInput[] | usersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsersInput | usersCreateOrConnectWithoutUsersInput[]
    createMany?: usersCreateManyUsersInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type walletsUncheckedCreateNestedOneWithoutUsersInput = {
    create?: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: walletsCreateOrConnectWithoutUsersInput
    connect?: walletsWhereUniqueInput
  }

  export type investmentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput> | investmentsCreateWithoutUsersInput[] | investmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: investmentsCreateOrConnectWithoutUsersInput | investmentsCreateOrConnectWithoutUsersInput[]
    upsert?: investmentsUpsertWithWhereUniqueWithoutUsersInput | investmentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: investmentsCreateManyUsersInputEnvelope
    set?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    disconnect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    delete?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    connect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    update?: investmentsUpdateWithWhereUniqueWithoutUsersInput | investmentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: investmentsUpdateManyWithWhereWithoutUsersInput | investmentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: investmentsScalarWhereInput | investmentsScalarWhereInput[]
  }

  export type transactionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput> | transactionsCreateWithoutUsersInput[] | transactionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUsersInput | transactionsCreateOrConnectWithoutUsersInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutUsersInput | transactionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: transactionsCreateManyUsersInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutUsersInput | transactionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutUsersInput | transactionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type usersUpdateOneWithoutOther_usersNestedInput = {
    create?: XOR<usersCreateWithoutOther_usersInput, usersUncheckedCreateWithoutOther_usersInput>
    connectOrCreate?: usersCreateOrConnectWithoutOther_usersInput
    upsert?: usersUpsertWithoutOther_usersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutOther_usersInput, usersUpdateWithoutOther_usersInput>, usersUncheckedUpdateWithoutOther_usersInput>
  }

  export type usersUpdateManyWithoutUsersNestedInput = {
    create?: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput> | usersCreateWithoutUsersInput[] | usersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsersInput | usersCreateOrConnectWithoutUsersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsersInput | usersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: usersCreateManyUsersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsersInput | usersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsersInput | usersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type walletsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: walletsCreateOrConnectWithoutUsersInput
    upsert?: walletsUpsertWithoutUsersInput
    disconnect?: walletsWhereInput | boolean
    delete?: walletsWhereInput | boolean
    connect?: walletsWhereUniqueInput
    update?: XOR<XOR<walletsUpdateToOneWithWhereWithoutUsersInput, walletsUpdateWithoutUsersInput>, walletsUncheckedUpdateWithoutUsersInput>
  }

  export type investmentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput> | investmentsCreateWithoutUsersInput[] | investmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: investmentsCreateOrConnectWithoutUsersInput | investmentsCreateOrConnectWithoutUsersInput[]
    upsert?: investmentsUpsertWithWhereUniqueWithoutUsersInput | investmentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: investmentsCreateManyUsersInputEnvelope
    set?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    disconnect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    delete?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    connect?: investmentsWhereUniqueInput | investmentsWhereUniqueInput[]
    update?: investmentsUpdateWithWhereUniqueWithoutUsersInput | investmentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: investmentsUpdateManyWithWhereWithoutUsersInput | investmentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: investmentsScalarWhereInput | investmentsScalarWhereInput[]
  }

  export type transactionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput> | transactionsCreateWithoutUsersInput[] | transactionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: transactionsCreateOrConnectWithoutUsersInput | transactionsCreateOrConnectWithoutUsersInput[]
    upsert?: transactionsUpsertWithWhereUniqueWithoutUsersInput | transactionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: transactionsCreateManyUsersInputEnvelope
    set?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    disconnect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    delete?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    connect?: transactionsWhereUniqueInput | transactionsWhereUniqueInput[]
    update?: transactionsUpdateWithWhereUniqueWithoutUsersInput | transactionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: transactionsUpdateManyWithWhereWithoutUsersInput | transactionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput> | usersCreateWithoutUsersInput[] | usersUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: usersCreateOrConnectWithoutUsersInput | usersCreateOrConnectWithoutUsersInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutUsersInput | usersUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: usersCreateManyUsersInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutUsersInput | usersUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: usersUpdateManyWithWhereWithoutUsersInput | usersUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type walletsUncheckedUpdateOneWithoutUsersNestedInput = {
    create?: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: walletsCreateOrConnectWithoutUsersInput
    upsert?: walletsUpsertWithoutUsersInput
    disconnect?: walletsWhereInput | boolean
    delete?: walletsWhereInput | boolean
    connect?: walletsWhereUniqueInput
    update?: XOR<XOR<walletsUpdateToOneWithWhereWithoutUsersInput, walletsUpdateWithoutUsersInput>, walletsUncheckedUpdateWithoutUsersInput>
  }

  export type usersCreateNestedOneWithoutWalletsInput = {
    create?: XOR<usersCreateWithoutWalletsInput, usersUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: usersCreateOrConnectWithoutWalletsInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutWalletsNestedInput = {
    create?: XOR<usersCreateWithoutWalletsInput, usersUncheckedCreateWithoutWalletsInput>
    connectOrCreate?: usersCreateOrConnectWithoutWalletsInput
    upsert?: usersUpsertWithoutWalletsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutWalletsInput, usersUpdateWithoutWalletsInput>, usersUncheckedUpdateWithoutWalletsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type usersCreateWithoutInvestmentsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    transactions?: transactionsCreateNestedManyWithoutUsersInput
    users?: usersCreateNestedOneWithoutOther_usersInput
    other_users?: usersCreateNestedManyWithoutUsersInput
    wallets?: walletsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutInvestmentsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    transactions?: transactionsUncheckedCreateNestedManyWithoutUsersInput
    other_users?: usersUncheckedCreateNestedManyWithoutUsersInput
    wallets?: walletsUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutInvestmentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutInvestmentsInput, usersUncheckedCreateWithoutInvestmentsInput>
  }

  export type usersUpsertWithoutInvestmentsInput = {
    update: XOR<usersUpdateWithoutInvestmentsInput, usersUncheckedUpdateWithoutInvestmentsInput>
    create: XOR<usersCreateWithoutInvestmentsInput, usersUncheckedCreateWithoutInvestmentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutInvestmentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutInvestmentsInput, usersUncheckedUpdateWithoutInvestmentsInput>
  }

  export type usersUpdateWithoutInvestmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: transactionsUpdateManyWithoutUsersNestedInput
    users?: usersUpdateOneWithoutOther_usersNestedInput
    other_users?: usersUpdateManyWithoutUsersNestedInput
    wallets?: walletsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutInvestmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: transactionsUncheckedUpdateManyWithoutUsersNestedInput
    other_users?: usersUncheckedUpdateManyWithoutUsersNestedInput
    wallets?: walletsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type usersCreateWithoutTransactionsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsCreateNestedManyWithoutUsersInput
    users?: usersCreateNestedOneWithoutOther_usersInput
    other_users?: usersCreateNestedManyWithoutUsersInput
    wallets?: walletsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutTransactionsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsUncheckedCreateNestedManyWithoutUsersInput
    other_users?: usersUncheckedCreateNestedManyWithoutUsersInput
    wallets?: walletsUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutTransactionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
  }

  export type usersUpsertWithoutTransactionsInput = {
    update: XOR<usersUpdateWithoutTransactionsInput, usersUncheckedUpdateWithoutTransactionsInput>
    create: XOR<usersCreateWithoutTransactionsInput, usersUncheckedCreateWithoutTransactionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTransactionsInput, usersUncheckedUpdateWithoutTransactionsInput>
  }

  export type usersUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUpdateManyWithoutUsersNestedInput
    users?: usersUpdateOneWithoutOther_usersNestedInput
    other_users?: usersUpdateManyWithoutUsersNestedInput
    wallets?: walletsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUncheckedUpdateManyWithoutUsersNestedInput
    other_users?: usersUncheckedUpdateManyWithoutUsersNestedInput
    wallets?: walletsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type investmentsCreateWithoutUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
  }

  export type investmentsUncheckedCreateWithoutUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
  }

  export type investmentsCreateOrConnectWithoutUsersInput = {
    where: investmentsWhereUniqueInput
    create: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput>
  }

  export type investmentsCreateManyUsersInputEnvelope = {
    data: investmentsCreateManyUsersInput | investmentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type transactionsCreateWithoutUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
  }

  export type transactionsUncheckedCreateWithoutUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
  }

  export type transactionsCreateOrConnectWithoutUsersInput = {
    where: transactionsWhereUniqueInput
    create: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput>
  }

  export type transactionsCreateManyUsersInputEnvelope = {
    data: transactionsCreateManyUsersInput | transactionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutOther_usersInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsCreateNestedManyWithoutUsersInput
    transactions?: transactionsCreateNestedManyWithoutUsersInput
    users?: usersCreateNestedOneWithoutOther_usersInput
    wallets?: walletsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutOther_usersInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsUncheckedCreateNestedManyWithoutUsersInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUsersInput
    wallets?: walletsUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutOther_usersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutOther_usersInput, usersUncheckedCreateWithoutOther_usersInput>
  }

  export type usersCreateWithoutUsersInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsCreateNestedManyWithoutUsersInput
    transactions?: transactionsCreateNestedManyWithoutUsersInput
    other_users?: usersCreateNestedManyWithoutUsersInput
    wallets?: walletsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutUsersInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsUncheckedCreateNestedManyWithoutUsersInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUsersInput
    other_users?: usersUncheckedCreateNestedManyWithoutUsersInput
    wallets?: walletsUncheckedCreateNestedOneWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutUsersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput>
  }

  export type usersCreateManyUsersInputEnvelope = {
    data: usersCreateManyUsersInput | usersCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type walletsCreateWithoutUsersInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
  }

  export type walletsUncheckedCreateWithoutUsersInput = {
    id?: string
    balance?: Decimal | DecimalJsLike | number | string
  }

  export type walletsCreateOrConnectWithoutUsersInput = {
    where: walletsWhereUniqueInput
    create: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
  }

  export type investmentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: investmentsWhereUniqueInput
    update: XOR<investmentsUpdateWithoutUsersInput, investmentsUncheckedUpdateWithoutUsersInput>
    create: XOR<investmentsCreateWithoutUsersInput, investmentsUncheckedCreateWithoutUsersInput>
  }

  export type investmentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: investmentsWhereUniqueInput
    data: XOR<investmentsUpdateWithoutUsersInput, investmentsUncheckedUpdateWithoutUsersInput>
  }

  export type investmentsUpdateManyWithWhereWithoutUsersInput = {
    where: investmentsScalarWhereInput
    data: XOR<investmentsUpdateManyMutationInput, investmentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type investmentsScalarWhereInput = {
    AND?: investmentsScalarWhereInput | investmentsScalarWhereInput[]
    OR?: investmentsScalarWhereInput[]
    NOT?: investmentsScalarWhereInput | investmentsScalarWhereInput[]
    id?: StringFilter<"investments"> | string
    user_id?: StringFilter<"investments"> | string
    amount?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    package_name?: StringFilter<"investments"> | string
    monthly_profit_rate?: DecimalFilter<"investments"> | Decimal | DecimalJsLike | number | string
    status?: StringFilter<"investments"> | string
    start_date?: DateTimeFilter<"investments"> | Date | string
    unlock_date?: DateTimeFilter<"investments"> | Date | string
  }

  export type transactionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: transactionsWhereUniqueInput
    update: XOR<transactionsUpdateWithoutUsersInput, transactionsUncheckedUpdateWithoutUsersInput>
    create: XOR<transactionsCreateWithoutUsersInput, transactionsUncheckedCreateWithoutUsersInput>
  }

  export type transactionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: transactionsWhereUniqueInput
    data: XOR<transactionsUpdateWithoutUsersInput, transactionsUncheckedUpdateWithoutUsersInput>
  }

  export type transactionsUpdateManyWithWhereWithoutUsersInput = {
    where: transactionsScalarWhereInput
    data: XOR<transactionsUpdateManyMutationInput, transactionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type transactionsScalarWhereInput = {
    AND?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    OR?: transactionsScalarWhereInput[]
    NOT?: transactionsScalarWhereInput | transactionsScalarWhereInput[]
    id?: StringFilter<"transactions"> | string
    user_id?: StringFilter<"transactions"> | string
    amount?: DecimalFilter<"transactions"> | Decimal | DecimalJsLike | number | string
    type?: StringFilter<"transactions"> | string
    income_source?: StringFilter<"transactions"> | string
    description?: StringNullableFilter<"transactions"> | string | null
    timestamp?: DateTimeFilter<"transactions"> | Date | string
  }

  export type usersUpsertWithoutOther_usersInput = {
    update: XOR<usersUpdateWithoutOther_usersInput, usersUncheckedUpdateWithoutOther_usersInput>
    create: XOR<usersCreateWithoutOther_usersInput, usersUncheckedCreateWithoutOther_usersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutOther_usersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutOther_usersInput, usersUncheckedUpdateWithoutOther_usersInput>
  }

  export type usersUpdateWithoutOther_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUpdateManyWithoutUsersNestedInput
    users?: usersUpdateOneWithoutOther_usersNestedInput
    wallets?: walletsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutOther_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUncheckedUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUsersNestedInput
    wallets?: walletsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type usersUpsertWithWhereUniqueWithoutUsersInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutUsersInput, usersUncheckedUpdateWithoutUsersInput>
    create: XOR<usersCreateWithoutUsersInput, usersUncheckedCreateWithoutUsersInput>
  }

  export type usersUpdateWithWhereUniqueWithoutUsersInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutUsersInput, usersUncheckedUpdateWithoutUsersInput>
  }

  export type usersUpdateManyWithWhereWithoutUsersInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutUsersInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: StringFilter<"users"> | string
    full_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringNullableFilter<"users"> | string | null
    referral_code?: StringFilter<"users"> | string
    sponsor_id?: StringNullableFilter<"users"> | string | null
    position_in_sponsor_tree?: StringNullableFilter<"users"> | string | null
    role?: StringFilter<"users"> | string
    googleId?: StringNullableFilter<"users"> | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
  }

  export type walletsUpsertWithoutUsersInput = {
    update: XOR<walletsUpdateWithoutUsersInput, walletsUncheckedUpdateWithoutUsersInput>
    create: XOR<walletsCreateWithoutUsersInput, walletsUncheckedCreateWithoutUsersInput>
    where?: walletsWhereInput
  }

  export type walletsUpdateToOneWithWhereWithoutUsersInput = {
    where?: walletsWhereInput
    data: XOR<walletsUpdateWithoutUsersInput, walletsUncheckedUpdateWithoutUsersInput>
  }

  export type walletsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type walletsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type usersCreateWithoutWalletsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsCreateNestedManyWithoutUsersInput
    transactions?: transactionsCreateNestedManyWithoutUsersInput
    users?: usersCreateNestedOneWithoutOther_usersInput
    other_users?: usersCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutWalletsInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    sponsor_id?: string | null
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
    investments?: investmentsUncheckedCreateNestedManyWithoutUsersInput
    transactions?: transactionsUncheckedCreateNestedManyWithoutUsersInput
    other_users?: usersUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutWalletsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutWalletsInput, usersUncheckedCreateWithoutWalletsInput>
  }

  export type usersUpsertWithoutWalletsInput = {
    update: XOR<usersUpdateWithoutWalletsInput, usersUncheckedUpdateWithoutWalletsInput>
    create: XOR<usersCreateWithoutWalletsInput, usersUncheckedCreateWithoutWalletsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutWalletsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutWalletsInput, usersUncheckedUpdateWithoutWalletsInput>
  }

  export type usersUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUpdateManyWithoutUsersNestedInput
    users?: usersUpdateOneWithoutOther_usersNestedInput
    other_users?: usersUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutWalletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    sponsor_id?: NullableStringFieldUpdateOperationsInput | string | null
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUncheckedUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUsersNestedInput
    other_users?: usersUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type investmentsCreateManyUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    package_name: string
    monthly_profit_rate: Decimal | DecimalJsLike | number | string
    status: string
    start_date: Date | string
    unlock_date: Date | string
  }

  export type transactionsCreateManyUsersInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: string
    income_source: string
    description?: string | null
    timestamp?: Date | string
  }

  export type usersCreateManyUsersInput = {
    id?: string
    full_name: string
    email: string
    password_hash?: string | null
    referral_code: string
    position_in_sponsor_tree?: string | null
    role?: string
    googleId?: string | null
    created_at?: Date | string
  }

  export type investmentsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type investmentsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type investmentsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    package_name?: StringFieldUpdateOperationsInput | string
    monthly_profit_rate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    unlock_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transactionsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: StringFieldUpdateOperationsInput | string
    income_source?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUpdateManyWithoutUsersNestedInput
    other_users?: usersUpdateManyWithoutUsersNestedInput
    wallets?: walletsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: investmentsUncheckedUpdateManyWithoutUsersNestedInput
    transactions?: transactionsUncheckedUpdateManyWithoutUsersNestedInput
    other_users?: usersUncheckedUpdateManyWithoutUsersNestedInput
    wallets?: walletsUncheckedUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: NullableStringFieldUpdateOperationsInput | string | null
    referral_code?: StringFieldUpdateOperationsInput | string
    position_in_sponsor_tree?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}