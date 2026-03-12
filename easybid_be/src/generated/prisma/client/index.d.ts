
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Bid
 * 
 */
export type Bid = $Result.DefaultSelection<Prisma.$BidPayload>
/**
 * Model BidPosting
 * 
 */
export type BidPosting = $Result.DefaultSelection<Prisma.$BidPostingPayload>
/**
 * Model RFP
 * 
 */
export type RFP = $Result.DefaultSelection<Prisma.$RFPPayload>
/**
 * Model EmailGroup
 * 
 */
export type EmailGroup = $Result.DefaultSelection<Prisma.$EmailGroupPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model BidLineItem
 * 
 */
export type BidLineItem = $Result.DefaultSelection<Prisma.$BidLineItemPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model JobType
 * 
 */
export type JobType = $Result.DefaultSelection<Prisma.$JobTypePayload>
/**
 * Model CompanyFinancial
 * 
 */
export type CompanyFinancial = $Result.DefaultSelection<Prisma.$CompanyFinancialPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bids
 * const bids = await prisma.bid.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Bids
   * const bids = await prisma.bid.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.bid`: Exposes CRUD operations for the **Bid** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bids
    * const bids = await prisma.bid.findMany()
    * ```
    */
  get bid(): Prisma.BidDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bidPosting`: Exposes CRUD operations for the **BidPosting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BidPostings
    * const bidPostings = await prisma.bidPosting.findMany()
    * ```
    */
  get bidPosting(): Prisma.BidPostingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rFP`: Exposes CRUD operations for the **RFP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RFPS
    * const rFPS = await prisma.rFP.findMany()
    * ```
    */
  get rFP(): Prisma.RFPDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.emailGroup`: Exposes CRUD operations for the **EmailGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmailGroups
    * const emailGroups = await prisma.emailGroup.findMany()
    * ```
    */
  get emailGroup(): Prisma.EmailGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bidLineItem`: Exposes CRUD operations for the **BidLineItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BidLineItems
    * const bidLineItems = await prisma.bidLineItem.findMany()
    * ```
    */
  get bidLineItem(): Prisma.BidLineItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobType`: Exposes CRUD operations for the **JobType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobTypes
    * const jobTypes = await prisma.jobType.findMany()
    * ```
    */
  get jobType(): Prisma.JobTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyFinancial`: Exposes CRUD operations for the **CompanyFinancial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyFinancials
    * const companyFinancials = await prisma.companyFinancial.findMany()
    * ```
    */
  get companyFinancial(): Prisma.CompanyFinancialDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Bid: 'Bid',
    BidPosting: 'BidPosting',
    RFP: 'RFP',
    EmailGroup: 'EmailGroup',
    Job: 'Job',
    BidLineItem: 'BidLineItem',
    User: 'User',
    Company: 'Company',
    JobType: 'JobType',
    CompanyFinancial: 'CompanyFinancial'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "bid" | "bidPosting" | "rFP" | "emailGroup" | "job" | "bidLineItem" | "user" | "company" | "jobType" | "companyFinancial"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Bid: {
        payload: Prisma.$BidPayload<ExtArgs>
        fields: Prisma.BidFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BidFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BidFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          findFirst: {
            args: Prisma.BidFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BidFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          findMany: {
            args: Prisma.BidFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          create: {
            args: Prisma.BidCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          createMany: {
            args: Prisma.BidCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BidCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          delete: {
            args: Prisma.BidDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          update: {
            args: Prisma.BidUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          deleteMany: {
            args: Prisma.BidDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BidUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BidUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>[]
          }
          upsert: {
            args: Prisma.BidUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPayload>
          }
          aggregate: {
            args: Prisma.BidAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBid>
          }
          groupBy: {
            args: Prisma.BidGroupByArgs<ExtArgs>
            result: $Utils.Optional<BidGroupByOutputType>[]
          }
          count: {
            args: Prisma.BidCountArgs<ExtArgs>
            result: $Utils.Optional<BidCountAggregateOutputType> | number
          }
        }
      }
      BidPosting: {
        payload: Prisma.$BidPostingPayload<ExtArgs>
        fields: Prisma.BidPostingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BidPostingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BidPostingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          findFirst: {
            args: Prisma.BidPostingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BidPostingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          findMany: {
            args: Prisma.BidPostingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>[]
          }
          create: {
            args: Prisma.BidPostingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          createMany: {
            args: Prisma.BidPostingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BidPostingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>[]
          }
          delete: {
            args: Prisma.BidPostingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          update: {
            args: Prisma.BidPostingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          deleteMany: {
            args: Prisma.BidPostingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BidPostingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BidPostingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>[]
          }
          upsert: {
            args: Prisma.BidPostingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidPostingPayload>
          }
          aggregate: {
            args: Prisma.BidPostingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBidPosting>
          }
          groupBy: {
            args: Prisma.BidPostingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BidPostingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BidPostingCountArgs<ExtArgs>
            result: $Utils.Optional<BidPostingCountAggregateOutputType> | number
          }
        }
      }
      RFP: {
        payload: Prisma.$RFPPayload<ExtArgs>
        fields: Prisma.RFPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RFPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RFPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          findFirst: {
            args: Prisma.RFPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RFPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          findMany: {
            args: Prisma.RFPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>[]
          }
          create: {
            args: Prisma.RFPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          createMany: {
            args: Prisma.RFPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RFPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>[]
          }
          delete: {
            args: Prisma.RFPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          update: {
            args: Prisma.RFPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          deleteMany: {
            args: Prisma.RFPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RFPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RFPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>[]
          }
          upsert: {
            args: Prisma.RFPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RFPPayload>
          }
          aggregate: {
            args: Prisma.RFPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRFP>
          }
          groupBy: {
            args: Prisma.RFPGroupByArgs<ExtArgs>
            result: $Utils.Optional<RFPGroupByOutputType>[]
          }
          count: {
            args: Prisma.RFPCountArgs<ExtArgs>
            result: $Utils.Optional<RFPCountAggregateOutputType> | number
          }
        }
      }
      EmailGroup: {
        payload: Prisma.$EmailGroupPayload<ExtArgs>
        fields: Prisma.EmailGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          findFirst: {
            args: Prisma.EmailGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          findMany: {
            args: Prisma.EmailGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>[]
          }
          create: {
            args: Prisma.EmailGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          createMany: {
            args: Prisma.EmailGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>[]
          }
          delete: {
            args: Prisma.EmailGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          update: {
            args: Prisma.EmailGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          deleteMany: {
            args: Prisma.EmailGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>[]
          }
          upsert: {
            args: Prisma.EmailGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailGroupPayload>
          }
          aggregate: {
            args: Prisma.EmailGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmailGroup>
          }
          groupBy: {
            args: Prisma.EmailGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailGroupCountArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      BidLineItem: {
        payload: Prisma.$BidLineItemPayload<ExtArgs>
        fields: Prisma.BidLineItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BidLineItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BidLineItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          findFirst: {
            args: Prisma.BidLineItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BidLineItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          findMany: {
            args: Prisma.BidLineItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>[]
          }
          create: {
            args: Prisma.BidLineItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          createMany: {
            args: Prisma.BidLineItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BidLineItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>[]
          }
          delete: {
            args: Prisma.BidLineItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          update: {
            args: Prisma.BidLineItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          deleteMany: {
            args: Prisma.BidLineItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BidLineItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BidLineItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>[]
          }
          upsert: {
            args: Prisma.BidLineItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BidLineItemPayload>
          }
          aggregate: {
            args: Prisma.BidLineItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBidLineItem>
          }
          groupBy: {
            args: Prisma.BidLineItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<BidLineItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.BidLineItemCountArgs<ExtArgs>
            result: $Utils.Optional<BidLineItemCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      JobType: {
        payload: Prisma.$JobTypePayload<ExtArgs>
        fields: Prisma.JobTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          findFirst: {
            args: Prisma.JobTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          findMany: {
            args: Prisma.JobTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>[]
          }
          create: {
            args: Prisma.JobTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          createMany: {
            args: Prisma.JobTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>[]
          }
          delete: {
            args: Prisma.JobTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          update: {
            args: Prisma.JobTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          deleteMany: {
            args: Prisma.JobTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>[]
          }
          upsert: {
            args: Prisma.JobTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobTypePayload>
          }
          aggregate: {
            args: Prisma.JobTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobType>
          }
          groupBy: {
            args: Prisma.JobTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobTypeCountArgs<ExtArgs>
            result: $Utils.Optional<JobTypeCountAggregateOutputType> | number
          }
        }
      }
      CompanyFinancial: {
        payload: Prisma.$CompanyFinancialPayload<ExtArgs>
        fields: Prisma.CompanyFinancialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFinancialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFinancialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          findFirst: {
            args: Prisma.CompanyFinancialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFinancialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          findMany: {
            args: Prisma.CompanyFinancialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>[]
          }
          create: {
            args: Prisma.CompanyFinancialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          createMany: {
            args: Prisma.CompanyFinancialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyFinancialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>[]
          }
          delete: {
            args: Prisma.CompanyFinancialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          update: {
            args: Prisma.CompanyFinancialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          deleteMany: {
            args: Prisma.CompanyFinancialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyFinancialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyFinancialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>[]
          }
          upsert: {
            args: Prisma.CompanyFinancialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyFinancialPayload>
          }
          aggregate: {
            args: Prisma.CompanyFinancialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyFinancial>
          }
          groupBy: {
            args: Prisma.CompanyFinancialGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyFinancialGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyFinancialCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyFinancialCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    bid?: BidOmit
    bidPosting?: BidPostingOmit
    rFP?: RFPOmit
    emailGroup?: EmailGroupOmit
    job?: JobOmit
    bidLineItem?: BidLineItemOmit
    user?: UserOmit
    company?: CompanyOmit
    jobType?: JobTypeOmit
    companyFinancial?: CompanyFinancialOmit
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
   * Count Type BidCountOutputType
   */

  export type BidCountOutputType = {
    postings: number
    lineItems: number
  }

  export type BidCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postings?: boolean | BidCountOutputTypeCountPostingsArgs
    lineItems?: boolean | BidCountOutputTypeCountLineItemsArgs
  }

  // Custom InputTypes
  /**
   * BidCountOutputType without action
   */
  export type BidCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidCountOutputType
     */
    select?: BidCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BidCountOutputType without action
   */
  export type BidCountOutputTypeCountPostingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidPostingWhereInput
  }

  /**
   * BidCountOutputType without action
   */
  export type BidCountOutputTypeCountLineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidLineItemWhereInput
  }


  /**
   * Count Type RFPCountOutputType
   */

  export type RFPCountOutputType = {
    jobs: number
    bids: number
  }

  export type RFPCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | RFPCountOutputTypeCountJobsArgs
    bids?: boolean | RFPCountOutputTypeCountBidsArgs
  }

  // Custom InputTypes
  /**
   * RFPCountOutputType without action
   */
  export type RFPCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFPCountOutputType
     */
    select?: RFPCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RFPCountOutputType without action
   */
  export type RFPCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * RFPCountOutputType without action
   */
  export type RFPCountOutputTypeCountBidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidWhereInput
  }


  /**
   * Count Type EmailGroupCountOutputType
   */

  export type EmailGroupCountOutputType = {
    rfps: number
  }

  export type EmailGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfps?: boolean | EmailGroupCountOutputTypeCountRfpsArgs
  }

  // Custom InputTypes
  /**
   * EmailGroupCountOutputType without action
   */
  export type EmailGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroupCountOutputType
     */
    select?: EmailGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailGroupCountOutputType without action
   */
  export type EmailGroupCountOutputTypeCountRfpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RFPWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Bid
   */

  export type AggregateBid = {
    _count: BidCountAggregateOutputType | null
    _avg: BidAvgAggregateOutputType | null
    _sum: BidSumAggregateOutputType | null
    _min: BidMinAggregateOutputType | null
    _max: BidMaxAggregateOutputType | null
  }

  export type BidAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    rfpId: number | null
  }

  export type BidSumAggregateOutputType = {
    id: number | null
    amount: number | null
    rfpId: number | null
  }

  export type BidMinAggregateOutputType = {
    id: number | null
    amount: number | null
    approved: boolean | null
    user: string | null
    company: string | null
    info: string | null
    expectedDate: Date | null
    rfpId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    approved: boolean | null
    user: string | null
    company: string | null
    info: string | null
    expectedDate: Date | null
    rfpId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidCountAggregateOutputType = {
    id: number
    amount: number
    approved: number
    user: number
    company: number
    info: number
    expectedDate: number
    rfpId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BidAvgAggregateInputType = {
    id?: true
    amount?: true
    rfpId?: true
  }

  export type BidSumAggregateInputType = {
    id?: true
    amount?: true
    rfpId?: true
  }

  export type BidMinAggregateInputType = {
    id?: true
    amount?: true
    approved?: true
    user?: true
    company?: true
    info?: true
    expectedDate?: true
    rfpId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidMaxAggregateInputType = {
    id?: true
    amount?: true
    approved?: true
    user?: true
    company?: true
    info?: true
    expectedDate?: true
    rfpId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidCountAggregateInputType = {
    id?: true
    amount?: true
    approved?: true
    user?: true
    company?: true
    info?: true
    expectedDate?: true
    rfpId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BidAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bid to aggregate.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bids
    **/
    _count?: true | BidCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BidAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BidSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BidMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BidMaxAggregateInputType
  }

  export type GetBidAggregateType<T extends BidAggregateArgs> = {
        [P in keyof T & keyof AggregateBid]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBid[P]>
      : GetScalarType<T[P], AggregateBid[P]>
  }




  export type BidGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidWhereInput
    orderBy?: BidOrderByWithAggregationInput | BidOrderByWithAggregationInput[]
    by: BidScalarFieldEnum[] | BidScalarFieldEnum
    having?: BidScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BidCountAggregateInputType | true
    _avg?: BidAvgAggregateInputType
    _sum?: BidSumAggregateInputType
    _min?: BidMinAggregateInputType
    _max?: BidMaxAggregateInputType
  }

  export type BidGroupByOutputType = {
    id: number
    amount: number
    approved: boolean
    user: string | null
    company: string | null
    info: string | null
    expectedDate: Date | null
    rfpId: number | null
    createdAt: Date
    updatedAt: Date
    _count: BidCountAggregateOutputType | null
    _avg: BidAvgAggregateOutputType | null
    _sum: BidSumAggregateOutputType | null
    _min: BidMinAggregateOutputType | null
    _max: BidMaxAggregateOutputType | null
  }

  type GetBidGroupByPayload<T extends BidGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BidGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BidGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BidGroupByOutputType[P]>
            : GetScalarType<T[P], BidGroupByOutputType[P]>
        }
      >
    >


  export type BidSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    approved?: boolean
    user?: boolean
    company?: boolean
    info?: boolean
    expectedDate?: boolean
    rfpId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
    postings?: boolean | Bid$postingsArgs<ExtArgs>
    lineItems?: boolean | Bid$lineItemsArgs<ExtArgs>
    _count?: boolean | BidCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    approved?: boolean
    user?: boolean
    company?: boolean
    info?: boolean
    expectedDate?: boolean
    rfpId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    approved?: boolean
    user?: boolean
    company?: boolean
    info?: boolean
    expectedDate?: boolean
    rfpId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
  }, ExtArgs["result"]["bid"]>

  export type BidSelectScalar = {
    id?: boolean
    amount?: boolean
    approved?: boolean
    user?: boolean
    company?: boolean
    info?: boolean
    expectedDate?: boolean
    rfpId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BidOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "approved" | "user" | "company" | "info" | "expectedDate" | "rfpId" | "createdAt" | "updatedAt", ExtArgs["result"]["bid"]>
  export type BidInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
    postings?: boolean | Bid$postingsArgs<ExtArgs>
    lineItems?: boolean | Bid$lineItemsArgs<ExtArgs>
    _count?: boolean | BidCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BidIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
  }
  export type BidIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Bid$rfpArgs<ExtArgs>
  }

  export type $BidPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bid"
    objects: {
      rfp: Prisma.$RFPPayload<ExtArgs> | null
      postings: Prisma.$BidPostingPayload<ExtArgs>[]
      lineItems: Prisma.$BidLineItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: number
      approved: boolean
      user: string | null
      company: string | null
      info: string | null
      expectedDate: Date | null
      rfpId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bid"]>
    composites: {}
  }

  type BidGetPayload<S extends boolean | null | undefined | BidDefaultArgs> = $Result.GetResult<Prisma.$BidPayload, S>

  type BidCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BidFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BidCountAggregateInputType | true
    }

  export interface BidDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bid'], meta: { name: 'Bid' } }
    /**
     * Find zero or one Bid that matches the filter.
     * @param {BidFindUniqueArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BidFindUniqueArgs>(args: SelectSubset<T, BidFindUniqueArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bid that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BidFindUniqueOrThrowArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BidFindUniqueOrThrowArgs>(args: SelectSubset<T, BidFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bid that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindFirstArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BidFindFirstArgs>(args?: SelectSubset<T, BidFindFirstArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bid that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindFirstOrThrowArgs} args - Arguments to find a Bid
     * @example
     * // Get one Bid
     * const bid = await prisma.bid.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BidFindFirstOrThrowArgs>(args?: SelectSubset<T, BidFindFirstOrThrowArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bids that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bids
     * const bids = await prisma.bid.findMany()
     * 
     * // Get first 10 Bids
     * const bids = await prisma.bid.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bidWithIdOnly = await prisma.bid.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BidFindManyArgs>(args?: SelectSubset<T, BidFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bid.
     * @param {BidCreateArgs} args - Arguments to create a Bid.
     * @example
     * // Create one Bid
     * const Bid = await prisma.bid.create({
     *   data: {
     *     // ... data to create a Bid
     *   }
     * })
     * 
     */
    create<T extends BidCreateArgs>(args: SelectSubset<T, BidCreateArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bids.
     * @param {BidCreateManyArgs} args - Arguments to create many Bids.
     * @example
     * // Create many Bids
     * const bid = await prisma.bid.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BidCreateManyArgs>(args?: SelectSubset<T, BidCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bids and returns the data saved in the database.
     * @param {BidCreateManyAndReturnArgs} args - Arguments to create many Bids.
     * @example
     * // Create many Bids
     * const bid = await prisma.bid.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bids and only return the `id`
     * const bidWithIdOnly = await prisma.bid.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BidCreateManyAndReturnArgs>(args?: SelectSubset<T, BidCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bid.
     * @param {BidDeleteArgs} args - Arguments to delete one Bid.
     * @example
     * // Delete one Bid
     * const Bid = await prisma.bid.delete({
     *   where: {
     *     // ... filter to delete one Bid
     *   }
     * })
     * 
     */
    delete<T extends BidDeleteArgs>(args: SelectSubset<T, BidDeleteArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bid.
     * @param {BidUpdateArgs} args - Arguments to update one Bid.
     * @example
     * // Update one Bid
     * const bid = await prisma.bid.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BidUpdateArgs>(args: SelectSubset<T, BidUpdateArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bids.
     * @param {BidDeleteManyArgs} args - Arguments to filter Bids to delete.
     * @example
     * // Delete a few Bids
     * const { count } = await prisma.bid.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BidDeleteManyArgs>(args?: SelectSubset<T, BidDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bids
     * const bid = await prisma.bid.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BidUpdateManyArgs>(args: SelectSubset<T, BidUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bids and returns the data updated in the database.
     * @param {BidUpdateManyAndReturnArgs} args - Arguments to update many Bids.
     * @example
     * // Update many Bids
     * const bid = await prisma.bid.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bids and only return the `id`
     * const bidWithIdOnly = await prisma.bid.updateManyAndReturn({
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
    updateManyAndReturn<T extends BidUpdateManyAndReturnArgs>(args: SelectSubset<T, BidUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bid.
     * @param {BidUpsertArgs} args - Arguments to update or create a Bid.
     * @example
     * // Update or create a Bid
     * const bid = await prisma.bid.upsert({
     *   create: {
     *     // ... data to create a Bid
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bid we want to update
     *   }
     * })
     */
    upsert<T extends BidUpsertArgs>(args: SelectSubset<T, BidUpsertArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bids.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidCountArgs} args - Arguments to filter Bids to count.
     * @example
     * // Count the number of Bids
     * const count = await prisma.bid.count({
     *   where: {
     *     // ... the filter for the Bids we want to count
     *   }
     * })
    **/
    count<T extends BidCountArgs>(
      args?: Subset<T, BidCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BidCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BidAggregateArgs>(args: Subset<T, BidAggregateArgs>): Prisma.PrismaPromise<GetBidAggregateType<T>>

    /**
     * Group by Bid.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidGroupByArgs} args - Group by arguments.
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
      T extends BidGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BidGroupByArgs['orderBy'] }
        : { orderBy?: BidGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BidGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bid model
   */
  readonly fields: BidFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bid.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BidClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rfp<T extends Bid$rfpArgs<ExtArgs> = {}>(args?: Subset<T, Bid$rfpArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    postings<T extends Bid$postingsArgs<ExtArgs> = {}>(args?: Subset<T, Bid$postingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lineItems<T extends Bid$lineItemsArgs<ExtArgs> = {}>(args?: Subset<T, Bid$lineItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Bid model
   */
  interface BidFieldRefs {
    readonly id: FieldRef<"Bid", 'Int'>
    readonly amount: FieldRef<"Bid", 'Float'>
    readonly approved: FieldRef<"Bid", 'Boolean'>
    readonly user: FieldRef<"Bid", 'String'>
    readonly company: FieldRef<"Bid", 'String'>
    readonly info: FieldRef<"Bid", 'String'>
    readonly expectedDate: FieldRef<"Bid", 'DateTime'>
    readonly rfpId: FieldRef<"Bid", 'Int'>
    readonly createdAt: FieldRef<"Bid", 'DateTime'>
    readonly updatedAt: FieldRef<"Bid", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bid findUnique
   */
  export type BidFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid findUniqueOrThrow
   */
  export type BidFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid findFirst
   */
  export type BidFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bids.
     */
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid findFirstOrThrow
   */
  export type BidFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bid to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bids.
     */
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid findMany
   */
  export type BidFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter, which Bids to fetch.
     */
    where?: BidWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bids to fetch.
     */
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bids.
     */
    cursor?: BidWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bids from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bids.
     */
    skip?: number
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * Bid create
   */
  export type BidCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The data needed to create a Bid.
     */
    data: XOR<BidCreateInput, BidUncheckedCreateInput>
  }

  /**
   * Bid createMany
   */
  export type BidCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bids.
     */
    data: BidCreateManyInput | BidCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bid createManyAndReturn
   */
  export type BidCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * The data used to create many Bids.
     */
    data: BidCreateManyInput | BidCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bid update
   */
  export type BidUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The data needed to update a Bid.
     */
    data: XOR<BidUpdateInput, BidUncheckedUpdateInput>
    /**
     * Choose, which Bid to update.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid updateMany
   */
  export type BidUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bids.
     */
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyInput>
    /**
     * Filter which Bids to update
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to update.
     */
    limit?: number
  }

  /**
   * Bid updateManyAndReturn
   */
  export type BidUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * The data used to update Bids.
     */
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyInput>
    /**
     * Filter which Bids to update
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bid upsert
   */
  export type BidUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * The filter to search for the Bid to update in case it exists.
     */
    where: BidWhereUniqueInput
    /**
     * In case the Bid found by the `where` argument doesn't exist, create a new Bid with this data.
     */
    create: XOR<BidCreateInput, BidUncheckedCreateInput>
    /**
     * In case the Bid was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BidUpdateInput, BidUncheckedUpdateInput>
  }

  /**
   * Bid delete
   */
  export type BidDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    /**
     * Filter which Bid to delete.
     */
    where: BidWhereUniqueInput
  }

  /**
   * Bid deleteMany
   */
  export type BidDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bids to delete
     */
    where?: BidWhereInput
    /**
     * Limit how many Bids to delete.
     */
    limit?: number
  }

  /**
   * Bid.rfp
   */
  export type Bid$rfpArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    where?: RFPWhereInput
  }

  /**
   * Bid.postings
   */
  export type Bid$postingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    where?: BidPostingWhereInput
    orderBy?: BidPostingOrderByWithRelationInput | BidPostingOrderByWithRelationInput[]
    cursor?: BidPostingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BidPostingScalarFieldEnum | BidPostingScalarFieldEnum[]
  }

  /**
   * Bid.lineItems
   */
  export type Bid$lineItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    where?: BidLineItemWhereInput
    orderBy?: BidLineItemOrderByWithRelationInput | BidLineItemOrderByWithRelationInput[]
    cursor?: BidLineItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BidLineItemScalarFieldEnum | BidLineItemScalarFieldEnum[]
  }

  /**
   * Bid without action
   */
  export type BidDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
  }


  /**
   * Model BidPosting
   */

  export type AggregateBidPosting = {
    _count: BidPostingCountAggregateOutputType | null
    _avg: BidPostingAvgAggregateOutputType | null
    _sum: BidPostingSumAggregateOutputType | null
    _min: BidPostingMinAggregateOutputType | null
    _max: BidPostingMaxAggregateOutputType | null
  }

  export type BidPostingAvgAggregateOutputType = {
    id: number | null
    bidId: number | null
    selectedOffer: number | null
  }

  export type BidPostingSumAggregateOutputType = {
    id: number | null
    bidId: number | null
    selectedOffer: number | null
  }

  export type BidPostingMinAggregateOutputType = {
    id: number | null
    bidId: number | null
    description: string | null
    type: string | null
    selectedOffer: number | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidPostingMaxAggregateOutputType = {
    id: number | null
    bidId: number | null
    description: string | null
    type: string | null
    selectedOffer: number | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidPostingCountAggregateOutputType = {
    id: number
    bidId: number
    description: number
    type: number
    images: number
    attributes: number
    selectedOffer: number
    company: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BidPostingAvgAggregateInputType = {
    id?: true
    bidId?: true
    selectedOffer?: true
  }

  export type BidPostingSumAggregateInputType = {
    id?: true
    bidId?: true
    selectedOffer?: true
  }

  export type BidPostingMinAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    type?: true
    selectedOffer?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidPostingMaxAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    type?: true
    selectedOffer?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidPostingCountAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    type?: true
    images?: true
    attributes?: true
    selectedOffer?: true
    company?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BidPostingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BidPosting to aggregate.
     */
    where?: BidPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidPostings to fetch.
     */
    orderBy?: BidPostingOrderByWithRelationInput | BidPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BidPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BidPostings
    **/
    _count?: true | BidPostingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BidPostingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BidPostingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BidPostingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BidPostingMaxAggregateInputType
  }

  export type GetBidPostingAggregateType<T extends BidPostingAggregateArgs> = {
        [P in keyof T & keyof AggregateBidPosting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBidPosting[P]>
      : GetScalarType<T[P], AggregateBidPosting[P]>
  }




  export type BidPostingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidPostingWhereInput
    orderBy?: BidPostingOrderByWithAggregationInput | BidPostingOrderByWithAggregationInput[]
    by: BidPostingScalarFieldEnum[] | BidPostingScalarFieldEnum
    having?: BidPostingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BidPostingCountAggregateInputType | true
    _avg?: BidPostingAvgAggregateInputType
    _sum?: BidPostingSumAggregateInputType
    _min?: BidPostingMinAggregateInputType
    _max?: BidPostingMaxAggregateInputType
  }

  export type BidPostingGroupByOutputType = {
    id: number
    bidId: number
    description: string | null
    type: string | null
    images: JsonValue | null
    attributes: JsonValue | null
    selectedOffer: number | null
    company: string | null
    createdAt: Date
    updatedAt: Date
    _count: BidPostingCountAggregateOutputType | null
    _avg: BidPostingAvgAggregateOutputType | null
    _sum: BidPostingSumAggregateOutputType | null
    _min: BidPostingMinAggregateOutputType | null
    _max: BidPostingMaxAggregateOutputType | null
  }

  type GetBidPostingGroupByPayload<T extends BidPostingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BidPostingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BidPostingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BidPostingGroupByOutputType[P]>
            : GetScalarType<T[P], BidPostingGroupByOutputType[P]>
        }
      >
    >


  export type BidPostingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    type?: boolean
    images?: boolean
    attributes?: boolean
    selectedOffer?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidPosting"]>

  export type BidPostingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    type?: boolean
    images?: boolean
    attributes?: boolean
    selectedOffer?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidPosting"]>

  export type BidPostingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    type?: boolean
    images?: boolean
    attributes?: boolean
    selectedOffer?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidPosting"]>

  export type BidPostingSelectScalar = {
    id?: boolean
    bidId?: boolean
    description?: boolean
    type?: boolean
    images?: boolean
    attributes?: boolean
    selectedOffer?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BidPostingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bidId" | "description" | "type" | "images" | "attributes" | "selectedOffer" | "company" | "createdAt" | "updatedAt", ExtArgs["result"]["bidPosting"]>
  export type BidPostingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }
  export type BidPostingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }
  export type BidPostingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }

  export type $BidPostingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BidPosting"
    objects: {
      bid: Prisma.$BidPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bidId: number
      description: string | null
      type: string | null
      images: Prisma.JsonValue | null
      attributes: Prisma.JsonValue | null
      selectedOffer: number | null
      company: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bidPosting"]>
    composites: {}
  }

  type BidPostingGetPayload<S extends boolean | null | undefined | BidPostingDefaultArgs> = $Result.GetResult<Prisma.$BidPostingPayload, S>

  type BidPostingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BidPostingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BidPostingCountAggregateInputType | true
    }

  export interface BidPostingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BidPosting'], meta: { name: 'BidPosting' } }
    /**
     * Find zero or one BidPosting that matches the filter.
     * @param {BidPostingFindUniqueArgs} args - Arguments to find a BidPosting
     * @example
     * // Get one BidPosting
     * const bidPosting = await prisma.bidPosting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BidPostingFindUniqueArgs>(args: SelectSubset<T, BidPostingFindUniqueArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BidPosting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BidPostingFindUniqueOrThrowArgs} args - Arguments to find a BidPosting
     * @example
     * // Get one BidPosting
     * const bidPosting = await prisma.bidPosting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BidPostingFindUniqueOrThrowArgs>(args: SelectSubset<T, BidPostingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BidPosting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingFindFirstArgs} args - Arguments to find a BidPosting
     * @example
     * // Get one BidPosting
     * const bidPosting = await prisma.bidPosting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BidPostingFindFirstArgs>(args?: SelectSubset<T, BidPostingFindFirstArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BidPosting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingFindFirstOrThrowArgs} args - Arguments to find a BidPosting
     * @example
     * // Get one BidPosting
     * const bidPosting = await prisma.bidPosting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BidPostingFindFirstOrThrowArgs>(args?: SelectSubset<T, BidPostingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BidPostings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BidPostings
     * const bidPostings = await prisma.bidPosting.findMany()
     * 
     * // Get first 10 BidPostings
     * const bidPostings = await prisma.bidPosting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bidPostingWithIdOnly = await prisma.bidPosting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BidPostingFindManyArgs>(args?: SelectSubset<T, BidPostingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BidPosting.
     * @param {BidPostingCreateArgs} args - Arguments to create a BidPosting.
     * @example
     * // Create one BidPosting
     * const BidPosting = await prisma.bidPosting.create({
     *   data: {
     *     // ... data to create a BidPosting
     *   }
     * })
     * 
     */
    create<T extends BidPostingCreateArgs>(args: SelectSubset<T, BidPostingCreateArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BidPostings.
     * @param {BidPostingCreateManyArgs} args - Arguments to create many BidPostings.
     * @example
     * // Create many BidPostings
     * const bidPosting = await prisma.bidPosting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BidPostingCreateManyArgs>(args?: SelectSubset<T, BidPostingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BidPostings and returns the data saved in the database.
     * @param {BidPostingCreateManyAndReturnArgs} args - Arguments to create many BidPostings.
     * @example
     * // Create many BidPostings
     * const bidPosting = await prisma.bidPosting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BidPostings and only return the `id`
     * const bidPostingWithIdOnly = await prisma.bidPosting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BidPostingCreateManyAndReturnArgs>(args?: SelectSubset<T, BidPostingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BidPosting.
     * @param {BidPostingDeleteArgs} args - Arguments to delete one BidPosting.
     * @example
     * // Delete one BidPosting
     * const BidPosting = await prisma.bidPosting.delete({
     *   where: {
     *     // ... filter to delete one BidPosting
     *   }
     * })
     * 
     */
    delete<T extends BidPostingDeleteArgs>(args: SelectSubset<T, BidPostingDeleteArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BidPosting.
     * @param {BidPostingUpdateArgs} args - Arguments to update one BidPosting.
     * @example
     * // Update one BidPosting
     * const bidPosting = await prisma.bidPosting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BidPostingUpdateArgs>(args: SelectSubset<T, BidPostingUpdateArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BidPostings.
     * @param {BidPostingDeleteManyArgs} args - Arguments to filter BidPostings to delete.
     * @example
     * // Delete a few BidPostings
     * const { count } = await prisma.bidPosting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BidPostingDeleteManyArgs>(args?: SelectSubset<T, BidPostingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BidPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BidPostings
     * const bidPosting = await prisma.bidPosting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BidPostingUpdateManyArgs>(args: SelectSubset<T, BidPostingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BidPostings and returns the data updated in the database.
     * @param {BidPostingUpdateManyAndReturnArgs} args - Arguments to update many BidPostings.
     * @example
     * // Update many BidPostings
     * const bidPosting = await prisma.bidPosting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BidPostings and only return the `id`
     * const bidPostingWithIdOnly = await prisma.bidPosting.updateManyAndReturn({
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
    updateManyAndReturn<T extends BidPostingUpdateManyAndReturnArgs>(args: SelectSubset<T, BidPostingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BidPosting.
     * @param {BidPostingUpsertArgs} args - Arguments to update or create a BidPosting.
     * @example
     * // Update or create a BidPosting
     * const bidPosting = await prisma.bidPosting.upsert({
     *   create: {
     *     // ... data to create a BidPosting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BidPosting we want to update
     *   }
     * })
     */
    upsert<T extends BidPostingUpsertArgs>(args: SelectSubset<T, BidPostingUpsertArgs<ExtArgs>>): Prisma__BidPostingClient<$Result.GetResult<Prisma.$BidPostingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BidPostings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingCountArgs} args - Arguments to filter BidPostings to count.
     * @example
     * // Count the number of BidPostings
     * const count = await prisma.bidPosting.count({
     *   where: {
     *     // ... the filter for the BidPostings we want to count
     *   }
     * })
    **/
    count<T extends BidPostingCountArgs>(
      args?: Subset<T, BidPostingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BidPostingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BidPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BidPostingAggregateArgs>(args: Subset<T, BidPostingAggregateArgs>): Prisma.PrismaPromise<GetBidPostingAggregateType<T>>

    /**
     * Group by BidPosting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidPostingGroupByArgs} args - Group by arguments.
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
      T extends BidPostingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BidPostingGroupByArgs['orderBy'] }
        : { orderBy?: BidPostingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BidPostingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidPostingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BidPosting model
   */
  readonly fields: BidPostingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BidPosting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BidPostingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bid<T extends BidDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BidDefaultArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BidPosting model
   */
  interface BidPostingFieldRefs {
    readonly id: FieldRef<"BidPosting", 'Int'>
    readonly bidId: FieldRef<"BidPosting", 'Int'>
    readonly description: FieldRef<"BidPosting", 'String'>
    readonly type: FieldRef<"BidPosting", 'String'>
    readonly images: FieldRef<"BidPosting", 'Json'>
    readonly attributes: FieldRef<"BidPosting", 'Json'>
    readonly selectedOffer: FieldRef<"BidPosting", 'Int'>
    readonly company: FieldRef<"BidPosting", 'String'>
    readonly createdAt: FieldRef<"BidPosting", 'DateTime'>
    readonly updatedAt: FieldRef<"BidPosting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BidPosting findUnique
   */
  export type BidPostingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter, which BidPosting to fetch.
     */
    where: BidPostingWhereUniqueInput
  }

  /**
   * BidPosting findUniqueOrThrow
   */
  export type BidPostingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter, which BidPosting to fetch.
     */
    where: BidPostingWhereUniqueInput
  }

  /**
   * BidPosting findFirst
   */
  export type BidPostingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter, which BidPosting to fetch.
     */
    where?: BidPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidPostings to fetch.
     */
    orderBy?: BidPostingOrderByWithRelationInput | BidPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BidPostings.
     */
    cursor?: BidPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BidPostings.
     */
    distinct?: BidPostingScalarFieldEnum | BidPostingScalarFieldEnum[]
  }

  /**
   * BidPosting findFirstOrThrow
   */
  export type BidPostingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter, which BidPosting to fetch.
     */
    where?: BidPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidPostings to fetch.
     */
    orderBy?: BidPostingOrderByWithRelationInput | BidPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BidPostings.
     */
    cursor?: BidPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidPostings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BidPostings.
     */
    distinct?: BidPostingScalarFieldEnum | BidPostingScalarFieldEnum[]
  }

  /**
   * BidPosting findMany
   */
  export type BidPostingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter, which BidPostings to fetch.
     */
    where?: BidPostingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidPostings to fetch.
     */
    orderBy?: BidPostingOrderByWithRelationInput | BidPostingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BidPostings.
     */
    cursor?: BidPostingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidPostings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidPostings.
     */
    skip?: number
    distinct?: BidPostingScalarFieldEnum | BidPostingScalarFieldEnum[]
  }

  /**
   * BidPosting create
   */
  export type BidPostingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * The data needed to create a BidPosting.
     */
    data: XOR<BidPostingCreateInput, BidPostingUncheckedCreateInput>
  }

  /**
   * BidPosting createMany
   */
  export type BidPostingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BidPostings.
     */
    data: BidPostingCreateManyInput | BidPostingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BidPosting createManyAndReturn
   */
  export type BidPostingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * The data used to create many BidPostings.
     */
    data: BidPostingCreateManyInput | BidPostingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BidPosting update
   */
  export type BidPostingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * The data needed to update a BidPosting.
     */
    data: XOR<BidPostingUpdateInput, BidPostingUncheckedUpdateInput>
    /**
     * Choose, which BidPosting to update.
     */
    where: BidPostingWhereUniqueInput
  }

  /**
   * BidPosting updateMany
   */
  export type BidPostingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BidPostings.
     */
    data: XOR<BidPostingUpdateManyMutationInput, BidPostingUncheckedUpdateManyInput>
    /**
     * Filter which BidPostings to update
     */
    where?: BidPostingWhereInput
    /**
     * Limit how many BidPostings to update.
     */
    limit?: number
  }

  /**
   * BidPosting updateManyAndReturn
   */
  export type BidPostingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * The data used to update BidPostings.
     */
    data: XOR<BidPostingUpdateManyMutationInput, BidPostingUncheckedUpdateManyInput>
    /**
     * Filter which BidPostings to update
     */
    where?: BidPostingWhereInput
    /**
     * Limit how many BidPostings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BidPosting upsert
   */
  export type BidPostingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * The filter to search for the BidPosting to update in case it exists.
     */
    where: BidPostingWhereUniqueInput
    /**
     * In case the BidPosting found by the `where` argument doesn't exist, create a new BidPosting with this data.
     */
    create: XOR<BidPostingCreateInput, BidPostingUncheckedCreateInput>
    /**
     * In case the BidPosting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BidPostingUpdateInput, BidPostingUncheckedUpdateInput>
  }

  /**
   * BidPosting delete
   */
  export type BidPostingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
    /**
     * Filter which BidPosting to delete.
     */
    where: BidPostingWhereUniqueInput
  }

  /**
   * BidPosting deleteMany
   */
  export type BidPostingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BidPostings to delete
     */
    where?: BidPostingWhereInput
    /**
     * Limit how many BidPostings to delete.
     */
    limit?: number
  }

  /**
   * BidPosting without action
   */
  export type BidPostingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidPosting
     */
    select?: BidPostingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidPosting
     */
    omit?: BidPostingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidPostingInclude<ExtArgs> | null
  }


  /**
   * Model RFP
   */

  export type AggregateRFP = {
    _count: RFPCountAggregateOutputType | null
    _avg: RFPAvgAggregateOutputType | null
    _sum: RFPSumAggregateOutputType | null
    _min: RFPMinAggregateOutputType | null
    _max: RFPMaxAggregateOutputType | null
  }

  export type RFPAvgAggregateOutputType = {
    id: number | null
    currentBids: number | null
    status: number | null
    emailGroupId: number | null
  }

  export type RFPSumAggregateOutputType = {
    id: number | null
    currentBids: number | null
    status: number | null
    emailGroupId: number | null
  }

  export type RFPMinAggregateOutputType = {
    id: number | null
    currentBids: number | null
    description: string | null
    jobType: string | null
    originalCompany: string | null
    status: number | null
    startDate: Date | null
    bidsDueDate: Date | null
    emailGroupId: number | null
    title: string | null
    User: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RFPMaxAggregateOutputType = {
    id: number | null
    currentBids: number | null
    description: string | null
    jobType: string | null
    originalCompany: string | null
    status: number | null
    startDate: Date | null
    bidsDueDate: Date | null
    emailGroupId: number | null
    title: string | null
    User: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RFPCountAggregateOutputType = {
    id: number
    currentBids: number
    description: number
    jobType: number
    images: number
    attributes: number
    originalCompany: number
    status: number
    startDate: number
    bidsDueDate: number
    emailList: number
    emailGroupId: number
    title: number
    User: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RFPAvgAggregateInputType = {
    id?: true
    currentBids?: true
    status?: true
    emailGroupId?: true
  }

  export type RFPSumAggregateInputType = {
    id?: true
    currentBids?: true
    status?: true
    emailGroupId?: true
  }

  export type RFPMinAggregateInputType = {
    id?: true
    currentBids?: true
    description?: true
    jobType?: true
    originalCompany?: true
    status?: true
    startDate?: true
    bidsDueDate?: true
    emailGroupId?: true
    title?: true
    User?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RFPMaxAggregateInputType = {
    id?: true
    currentBids?: true
    description?: true
    jobType?: true
    originalCompany?: true
    status?: true
    startDate?: true
    bidsDueDate?: true
    emailGroupId?: true
    title?: true
    User?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RFPCountAggregateInputType = {
    id?: true
    currentBids?: true
    description?: true
    jobType?: true
    images?: true
    attributes?: true
    originalCompany?: true
    status?: true
    startDate?: true
    bidsDueDate?: true
    emailList?: true
    emailGroupId?: true
    title?: true
    User?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RFPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RFP to aggregate.
     */
    where?: RFPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RFPS to fetch.
     */
    orderBy?: RFPOrderByWithRelationInput | RFPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RFPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RFPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RFPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RFPS
    **/
    _count?: true | RFPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RFPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RFPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RFPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RFPMaxAggregateInputType
  }

  export type GetRFPAggregateType<T extends RFPAggregateArgs> = {
        [P in keyof T & keyof AggregateRFP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRFP[P]>
      : GetScalarType<T[P], AggregateRFP[P]>
  }




  export type RFPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RFPWhereInput
    orderBy?: RFPOrderByWithAggregationInput | RFPOrderByWithAggregationInput[]
    by: RFPScalarFieldEnum[] | RFPScalarFieldEnum
    having?: RFPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RFPCountAggregateInputType | true
    _avg?: RFPAvgAggregateInputType
    _sum?: RFPSumAggregateInputType
    _min?: RFPMinAggregateInputType
    _max?: RFPMaxAggregateInputType
  }

  export type RFPGroupByOutputType = {
    id: number
    currentBids: number | null
    description: string | null
    jobType: string | null
    images: JsonValue | null
    attributes: JsonValue | null
    originalCompany: string | null
    status: number | null
    startDate: Date | null
    bidsDueDate: Date | null
    emailList: string[]
    emailGroupId: number | null
    title: string | null
    User: string | null
    createdAt: Date
    updatedAt: Date
    _count: RFPCountAggregateOutputType | null
    _avg: RFPAvgAggregateOutputType | null
    _sum: RFPSumAggregateOutputType | null
    _min: RFPMinAggregateOutputType | null
    _max: RFPMaxAggregateOutputType | null
  }

  type GetRFPGroupByPayload<T extends RFPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RFPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RFPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RFPGroupByOutputType[P]>
            : GetScalarType<T[P], RFPGroupByOutputType[P]>
        }
      >
    >


  export type RFPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    currentBids?: boolean
    description?: boolean
    jobType?: boolean
    images?: boolean
    attributes?: boolean
    originalCompany?: boolean
    status?: boolean
    startDate?: boolean
    bidsDueDate?: boolean
    emailList?: boolean
    emailGroupId?: boolean
    title?: boolean
    User?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
    jobs?: boolean | RFP$jobsArgs<ExtArgs>
    bids?: boolean | RFP$bidsArgs<ExtArgs>
    _count?: boolean | RFPCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rFP"]>

  export type RFPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    currentBids?: boolean
    description?: boolean
    jobType?: boolean
    images?: boolean
    attributes?: boolean
    originalCompany?: boolean
    status?: boolean
    startDate?: boolean
    bidsDueDate?: boolean
    emailList?: boolean
    emailGroupId?: boolean
    title?: boolean
    User?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
  }, ExtArgs["result"]["rFP"]>

  export type RFPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    currentBids?: boolean
    description?: boolean
    jobType?: boolean
    images?: boolean
    attributes?: boolean
    originalCompany?: boolean
    status?: boolean
    startDate?: boolean
    bidsDueDate?: boolean
    emailList?: boolean
    emailGroupId?: boolean
    title?: boolean
    User?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
  }, ExtArgs["result"]["rFP"]>

  export type RFPSelectScalar = {
    id?: boolean
    currentBids?: boolean
    description?: boolean
    jobType?: boolean
    images?: boolean
    attributes?: boolean
    originalCompany?: boolean
    status?: boolean
    startDate?: boolean
    bidsDueDate?: boolean
    emailList?: boolean
    emailGroupId?: boolean
    title?: boolean
    User?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RFPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "currentBids" | "description" | "jobType" | "images" | "attributes" | "originalCompany" | "status" | "startDate" | "bidsDueDate" | "emailList" | "emailGroupId" | "title" | "User" | "createdAt" | "updatedAt", ExtArgs["result"]["rFP"]>
  export type RFPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
    jobs?: boolean | RFP$jobsArgs<ExtArgs>
    bids?: boolean | RFP$bidsArgs<ExtArgs>
    _count?: boolean | RFPCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RFPIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
  }
  export type RFPIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emailGroup?: boolean | RFP$emailGroupArgs<ExtArgs>
  }

  export type $RFPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RFP"
    objects: {
      emailGroup: Prisma.$EmailGroupPayload<ExtArgs> | null
      jobs: Prisma.$JobPayload<ExtArgs>[]
      bids: Prisma.$BidPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      currentBids: number | null
      description: string | null
      jobType: string | null
      images: Prisma.JsonValue | null
      attributes: Prisma.JsonValue | null
      originalCompany: string | null
      status: number | null
      startDate: Date | null
      bidsDueDate: Date | null
      emailList: string[]
      emailGroupId: number | null
      title: string | null
      User: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rFP"]>
    composites: {}
  }

  type RFPGetPayload<S extends boolean | null | undefined | RFPDefaultArgs> = $Result.GetResult<Prisma.$RFPPayload, S>

  type RFPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RFPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RFPCountAggregateInputType | true
    }

  export interface RFPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RFP'], meta: { name: 'RFP' } }
    /**
     * Find zero or one RFP that matches the filter.
     * @param {RFPFindUniqueArgs} args - Arguments to find a RFP
     * @example
     * // Get one RFP
     * const rFP = await prisma.rFP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RFPFindUniqueArgs>(args: SelectSubset<T, RFPFindUniqueArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RFP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RFPFindUniqueOrThrowArgs} args - Arguments to find a RFP
     * @example
     * // Get one RFP
     * const rFP = await prisma.rFP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RFPFindUniqueOrThrowArgs>(args: SelectSubset<T, RFPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RFP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPFindFirstArgs} args - Arguments to find a RFP
     * @example
     * // Get one RFP
     * const rFP = await prisma.rFP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RFPFindFirstArgs>(args?: SelectSubset<T, RFPFindFirstArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RFP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPFindFirstOrThrowArgs} args - Arguments to find a RFP
     * @example
     * // Get one RFP
     * const rFP = await prisma.rFP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RFPFindFirstOrThrowArgs>(args?: SelectSubset<T, RFPFindFirstOrThrowArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RFPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RFPS
     * const rFPS = await prisma.rFP.findMany()
     * 
     * // Get first 10 RFPS
     * const rFPS = await prisma.rFP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rFPWithIdOnly = await prisma.rFP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RFPFindManyArgs>(args?: SelectSubset<T, RFPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RFP.
     * @param {RFPCreateArgs} args - Arguments to create a RFP.
     * @example
     * // Create one RFP
     * const RFP = await prisma.rFP.create({
     *   data: {
     *     // ... data to create a RFP
     *   }
     * })
     * 
     */
    create<T extends RFPCreateArgs>(args: SelectSubset<T, RFPCreateArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RFPS.
     * @param {RFPCreateManyArgs} args - Arguments to create many RFPS.
     * @example
     * // Create many RFPS
     * const rFP = await prisma.rFP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RFPCreateManyArgs>(args?: SelectSubset<T, RFPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RFPS and returns the data saved in the database.
     * @param {RFPCreateManyAndReturnArgs} args - Arguments to create many RFPS.
     * @example
     * // Create many RFPS
     * const rFP = await prisma.rFP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RFPS and only return the `id`
     * const rFPWithIdOnly = await prisma.rFP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RFPCreateManyAndReturnArgs>(args?: SelectSubset<T, RFPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RFP.
     * @param {RFPDeleteArgs} args - Arguments to delete one RFP.
     * @example
     * // Delete one RFP
     * const RFP = await prisma.rFP.delete({
     *   where: {
     *     // ... filter to delete one RFP
     *   }
     * })
     * 
     */
    delete<T extends RFPDeleteArgs>(args: SelectSubset<T, RFPDeleteArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RFP.
     * @param {RFPUpdateArgs} args - Arguments to update one RFP.
     * @example
     * // Update one RFP
     * const rFP = await prisma.rFP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RFPUpdateArgs>(args: SelectSubset<T, RFPUpdateArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RFPS.
     * @param {RFPDeleteManyArgs} args - Arguments to filter RFPS to delete.
     * @example
     * // Delete a few RFPS
     * const { count } = await prisma.rFP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RFPDeleteManyArgs>(args?: SelectSubset<T, RFPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RFPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RFPS
     * const rFP = await prisma.rFP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RFPUpdateManyArgs>(args: SelectSubset<T, RFPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RFPS and returns the data updated in the database.
     * @param {RFPUpdateManyAndReturnArgs} args - Arguments to update many RFPS.
     * @example
     * // Update many RFPS
     * const rFP = await prisma.rFP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RFPS and only return the `id`
     * const rFPWithIdOnly = await prisma.rFP.updateManyAndReturn({
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
    updateManyAndReturn<T extends RFPUpdateManyAndReturnArgs>(args: SelectSubset<T, RFPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RFP.
     * @param {RFPUpsertArgs} args - Arguments to update or create a RFP.
     * @example
     * // Update or create a RFP
     * const rFP = await prisma.rFP.upsert({
     *   create: {
     *     // ... data to create a RFP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RFP we want to update
     *   }
     * })
     */
    upsert<T extends RFPUpsertArgs>(args: SelectSubset<T, RFPUpsertArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RFPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPCountArgs} args - Arguments to filter RFPS to count.
     * @example
     * // Count the number of RFPS
     * const count = await prisma.rFP.count({
     *   where: {
     *     // ... the filter for the RFPS we want to count
     *   }
     * })
    **/
    count<T extends RFPCountArgs>(
      args?: Subset<T, RFPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RFPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RFP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RFPAggregateArgs>(args: Subset<T, RFPAggregateArgs>): Prisma.PrismaPromise<GetRFPAggregateType<T>>

    /**
     * Group by RFP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RFPGroupByArgs} args - Group by arguments.
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
      T extends RFPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RFPGroupByArgs['orderBy'] }
        : { orderBy?: RFPGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RFPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRFPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RFP model
   */
  readonly fields: RFPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RFP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RFPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emailGroup<T extends RFP$emailGroupArgs<ExtArgs> = {}>(args?: Subset<T, RFP$emailGroupArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    jobs<T extends RFP$jobsArgs<ExtArgs> = {}>(args?: Subset<T, RFP$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bids<T extends RFP$bidsArgs<ExtArgs> = {}>(args?: Subset<T, RFP$bidsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the RFP model
   */
  interface RFPFieldRefs {
    readonly id: FieldRef<"RFP", 'Int'>
    readonly currentBids: FieldRef<"RFP", 'Int'>
    readonly description: FieldRef<"RFP", 'String'>
    readonly jobType: FieldRef<"RFP", 'String'>
    readonly images: FieldRef<"RFP", 'Json'>
    readonly attributes: FieldRef<"RFP", 'Json'>
    readonly originalCompany: FieldRef<"RFP", 'String'>
    readonly status: FieldRef<"RFP", 'Int'>
    readonly startDate: FieldRef<"RFP", 'DateTime'>
    readonly bidsDueDate: FieldRef<"RFP", 'DateTime'>
    readonly emailList: FieldRef<"RFP", 'String[]'>
    readonly emailGroupId: FieldRef<"RFP", 'Int'>
    readonly title: FieldRef<"RFP", 'String'>
    readonly User: FieldRef<"RFP", 'String'>
    readonly createdAt: FieldRef<"RFP", 'DateTime'>
    readonly updatedAt: FieldRef<"RFP", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RFP findUnique
   */
  export type RFPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter, which RFP to fetch.
     */
    where: RFPWhereUniqueInput
  }

  /**
   * RFP findUniqueOrThrow
   */
  export type RFPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter, which RFP to fetch.
     */
    where: RFPWhereUniqueInput
  }

  /**
   * RFP findFirst
   */
  export type RFPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter, which RFP to fetch.
     */
    where?: RFPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RFPS to fetch.
     */
    orderBy?: RFPOrderByWithRelationInput | RFPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RFPS.
     */
    cursor?: RFPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RFPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RFPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RFPS.
     */
    distinct?: RFPScalarFieldEnum | RFPScalarFieldEnum[]
  }

  /**
   * RFP findFirstOrThrow
   */
  export type RFPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter, which RFP to fetch.
     */
    where?: RFPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RFPS to fetch.
     */
    orderBy?: RFPOrderByWithRelationInput | RFPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RFPS.
     */
    cursor?: RFPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RFPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RFPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RFPS.
     */
    distinct?: RFPScalarFieldEnum | RFPScalarFieldEnum[]
  }

  /**
   * RFP findMany
   */
  export type RFPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter, which RFPS to fetch.
     */
    where?: RFPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RFPS to fetch.
     */
    orderBy?: RFPOrderByWithRelationInput | RFPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RFPS.
     */
    cursor?: RFPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RFPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RFPS.
     */
    skip?: number
    distinct?: RFPScalarFieldEnum | RFPScalarFieldEnum[]
  }

  /**
   * RFP create
   */
  export type RFPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * The data needed to create a RFP.
     */
    data: XOR<RFPCreateInput, RFPUncheckedCreateInput>
  }

  /**
   * RFP createMany
   */
  export type RFPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RFPS.
     */
    data: RFPCreateManyInput | RFPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RFP createManyAndReturn
   */
  export type RFPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * The data used to create many RFPS.
     */
    data: RFPCreateManyInput | RFPCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RFP update
   */
  export type RFPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * The data needed to update a RFP.
     */
    data: XOR<RFPUpdateInput, RFPUncheckedUpdateInput>
    /**
     * Choose, which RFP to update.
     */
    where: RFPWhereUniqueInput
  }

  /**
   * RFP updateMany
   */
  export type RFPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RFPS.
     */
    data: XOR<RFPUpdateManyMutationInput, RFPUncheckedUpdateManyInput>
    /**
     * Filter which RFPS to update
     */
    where?: RFPWhereInput
    /**
     * Limit how many RFPS to update.
     */
    limit?: number
  }

  /**
   * RFP updateManyAndReturn
   */
  export type RFPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * The data used to update RFPS.
     */
    data: XOR<RFPUpdateManyMutationInput, RFPUncheckedUpdateManyInput>
    /**
     * Filter which RFPS to update
     */
    where?: RFPWhereInput
    /**
     * Limit how many RFPS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RFP upsert
   */
  export type RFPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * The filter to search for the RFP to update in case it exists.
     */
    where: RFPWhereUniqueInput
    /**
     * In case the RFP found by the `where` argument doesn't exist, create a new RFP with this data.
     */
    create: XOR<RFPCreateInput, RFPUncheckedCreateInput>
    /**
     * In case the RFP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RFPUpdateInput, RFPUncheckedUpdateInput>
  }

  /**
   * RFP delete
   */
  export type RFPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    /**
     * Filter which RFP to delete.
     */
    where: RFPWhereUniqueInput
  }

  /**
   * RFP deleteMany
   */
  export type RFPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RFPS to delete
     */
    where?: RFPWhereInput
    /**
     * Limit how many RFPS to delete.
     */
    limit?: number
  }

  /**
   * RFP.emailGroup
   */
  export type RFP$emailGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    where?: EmailGroupWhereInput
  }

  /**
   * RFP.jobs
   */
  export type RFP$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * RFP.bids
   */
  export type RFP$bidsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bid
     */
    select?: BidSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bid
     */
    omit?: BidOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidInclude<ExtArgs> | null
    where?: BidWhereInput
    orderBy?: BidOrderByWithRelationInput | BidOrderByWithRelationInput[]
    cursor?: BidWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BidScalarFieldEnum | BidScalarFieldEnum[]
  }

  /**
   * RFP without action
   */
  export type RFPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
  }


  /**
   * Model EmailGroup
   */

  export type AggregateEmailGroup = {
    _count: EmailGroupCountAggregateOutputType | null
    _avg: EmailGroupAvgAggregateOutputType | null
    _sum: EmailGroupSumAggregateOutputType | null
    _min: EmailGroupMinAggregateOutputType | null
    _max: EmailGroupMaxAggregateOutputType | null
  }

  export type EmailGroupAvgAggregateOutputType = {
    id: number | null
  }

  export type EmailGroupSumAggregateOutputType = {
    id: number | null
  }

  export type EmailGroupMinAggregateOutputType = {
    id: number | null
    name: string | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailGroupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmailGroupCountAggregateOutputType = {
    id: number
    name: number
    company: number
    emails: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmailGroupAvgAggregateInputType = {
    id?: true
  }

  export type EmailGroupSumAggregateInputType = {
    id?: true
  }

  export type EmailGroupMinAggregateInputType = {
    id?: true
    name?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailGroupMaxAggregateInputType = {
    id?: true
    name?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmailGroupCountAggregateInputType = {
    id?: true
    name?: true
    company?: true
    emails?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmailGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailGroup to aggregate.
     */
    where?: EmailGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailGroups to fetch.
     */
    orderBy?: EmailGroupOrderByWithRelationInput | EmailGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmailGroups
    **/
    _count?: true | EmailGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmailGroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmailGroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailGroupMaxAggregateInputType
  }

  export type GetEmailGroupAggregateType<T extends EmailGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateEmailGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmailGroup[P]>
      : GetScalarType<T[P], AggregateEmailGroup[P]>
  }




  export type EmailGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailGroupWhereInput
    orderBy?: EmailGroupOrderByWithAggregationInput | EmailGroupOrderByWithAggregationInput[]
    by: EmailGroupScalarFieldEnum[] | EmailGroupScalarFieldEnum
    having?: EmailGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailGroupCountAggregateInputType | true
    _avg?: EmailGroupAvgAggregateInputType
    _sum?: EmailGroupSumAggregateInputType
    _min?: EmailGroupMinAggregateInputType
    _max?: EmailGroupMaxAggregateInputType
  }

  export type EmailGroupGroupByOutputType = {
    id: number
    name: string
    company: string | null
    emails: string[]
    createdAt: Date
    updatedAt: Date
    _count: EmailGroupCountAggregateOutputType | null
    _avg: EmailGroupAvgAggregateOutputType | null
    _sum: EmailGroupSumAggregateOutputType | null
    _min: EmailGroupMinAggregateOutputType | null
    _max: EmailGroupMaxAggregateOutputType | null
  }

  type GetEmailGroupGroupByPayload<T extends EmailGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailGroupGroupByOutputType[P]>
            : GetScalarType<T[P], EmailGroupGroupByOutputType[P]>
        }
      >
    >


  export type EmailGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    emails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfps?: boolean | EmailGroup$rfpsArgs<ExtArgs>
    _count?: boolean | EmailGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["emailGroup"]>

  export type EmailGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    emails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailGroup"]>

  export type EmailGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    company?: boolean
    emails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["emailGroup"]>

  export type EmailGroupSelectScalar = {
    id?: boolean
    name?: boolean
    company?: boolean
    emails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmailGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "company" | "emails" | "createdAt" | "updatedAt", ExtArgs["result"]["emailGroup"]>
  export type EmailGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfps?: boolean | EmailGroup$rfpsArgs<ExtArgs>
    _count?: boolean | EmailGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmailGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EmailGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EmailGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmailGroup"
    objects: {
      rfps: Prisma.$RFPPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      company: string | null
      emails: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["emailGroup"]>
    composites: {}
  }

  type EmailGroupGetPayload<S extends boolean | null | undefined | EmailGroupDefaultArgs> = $Result.GetResult<Prisma.$EmailGroupPayload, S>

  type EmailGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailGroupCountAggregateInputType | true
    }

  export interface EmailGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmailGroup'], meta: { name: 'EmailGroup' } }
    /**
     * Find zero or one EmailGroup that matches the filter.
     * @param {EmailGroupFindUniqueArgs} args - Arguments to find a EmailGroup
     * @example
     * // Get one EmailGroup
     * const emailGroup = await prisma.emailGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailGroupFindUniqueArgs>(args: SelectSubset<T, EmailGroupFindUniqueArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmailGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailGroupFindUniqueOrThrowArgs} args - Arguments to find a EmailGroup
     * @example
     * // Get one EmailGroup
     * const emailGroup = await prisma.emailGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupFindFirstArgs} args - Arguments to find a EmailGroup
     * @example
     * // Get one EmailGroup
     * const emailGroup = await prisma.emailGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailGroupFindFirstArgs>(args?: SelectSubset<T, EmailGroupFindFirstArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmailGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupFindFirstOrThrowArgs} args - Arguments to find a EmailGroup
     * @example
     * // Get one EmailGroup
     * const emailGroup = await prisma.emailGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmailGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmailGroups
     * const emailGroups = await prisma.emailGroup.findMany()
     * 
     * // Get first 10 EmailGroups
     * const emailGroups = await prisma.emailGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailGroupWithIdOnly = await prisma.emailGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailGroupFindManyArgs>(args?: SelectSubset<T, EmailGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmailGroup.
     * @param {EmailGroupCreateArgs} args - Arguments to create a EmailGroup.
     * @example
     * // Create one EmailGroup
     * const EmailGroup = await prisma.emailGroup.create({
     *   data: {
     *     // ... data to create a EmailGroup
     *   }
     * })
     * 
     */
    create<T extends EmailGroupCreateArgs>(args: SelectSubset<T, EmailGroupCreateArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmailGroups.
     * @param {EmailGroupCreateManyArgs} args - Arguments to create many EmailGroups.
     * @example
     * // Create many EmailGroups
     * const emailGroup = await prisma.emailGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailGroupCreateManyArgs>(args?: SelectSubset<T, EmailGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmailGroups and returns the data saved in the database.
     * @param {EmailGroupCreateManyAndReturnArgs} args - Arguments to create many EmailGroups.
     * @example
     * // Create many EmailGroups
     * const emailGroup = await prisma.emailGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmailGroups and only return the `id`
     * const emailGroupWithIdOnly = await prisma.emailGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmailGroup.
     * @param {EmailGroupDeleteArgs} args - Arguments to delete one EmailGroup.
     * @example
     * // Delete one EmailGroup
     * const EmailGroup = await prisma.emailGroup.delete({
     *   where: {
     *     // ... filter to delete one EmailGroup
     *   }
     * })
     * 
     */
    delete<T extends EmailGroupDeleteArgs>(args: SelectSubset<T, EmailGroupDeleteArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmailGroup.
     * @param {EmailGroupUpdateArgs} args - Arguments to update one EmailGroup.
     * @example
     * // Update one EmailGroup
     * const emailGroup = await prisma.emailGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailGroupUpdateArgs>(args: SelectSubset<T, EmailGroupUpdateArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmailGroups.
     * @param {EmailGroupDeleteManyArgs} args - Arguments to filter EmailGroups to delete.
     * @example
     * // Delete a few EmailGroups
     * const { count } = await prisma.emailGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailGroupDeleteManyArgs>(args?: SelectSubset<T, EmailGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmailGroups
     * const emailGroup = await prisma.emailGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailGroupUpdateManyArgs>(args: SelectSubset<T, EmailGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmailGroups and returns the data updated in the database.
     * @param {EmailGroupUpdateManyAndReturnArgs} args - Arguments to update many EmailGroups.
     * @example
     * // Update many EmailGroups
     * const emailGroup = await prisma.emailGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmailGroups and only return the `id`
     * const emailGroupWithIdOnly = await prisma.emailGroup.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmailGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmailGroup.
     * @param {EmailGroupUpsertArgs} args - Arguments to update or create a EmailGroup.
     * @example
     * // Update or create a EmailGroup
     * const emailGroup = await prisma.emailGroup.upsert({
     *   create: {
     *     // ... data to create a EmailGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmailGroup we want to update
     *   }
     * })
     */
    upsert<T extends EmailGroupUpsertArgs>(args: SelectSubset<T, EmailGroupUpsertArgs<ExtArgs>>): Prisma__EmailGroupClient<$Result.GetResult<Prisma.$EmailGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmailGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupCountArgs} args - Arguments to filter EmailGroups to count.
     * @example
     * // Count the number of EmailGroups
     * const count = await prisma.emailGroup.count({
     *   where: {
     *     // ... the filter for the EmailGroups we want to count
     *   }
     * })
    **/
    count<T extends EmailGroupCountArgs>(
      args?: Subset<T, EmailGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmailGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmailGroupAggregateArgs>(args: Subset<T, EmailGroupAggregateArgs>): Prisma.PrismaPromise<GetEmailGroupAggregateType<T>>

    /**
     * Group by EmailGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupGroupByArgs} args - Group by arguments.
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
      T extends EmailGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailGroupGroupByArgs['orderBy'] }
        : { orderBy?: EmailGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmailGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmailGroup model
   */
  readonly fields: EmailGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmailGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rfps<T extends EmailGroup$rfpsArgs<ExtArgs> = {}>(args?: Subset<T, EmailGroup$rfpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the EmailGroup model
   */
  interface EmailGroupFieldRefs {
    readonly id: FieldRef<"EmailGroup", 'Int'>
    readonly name: FieldRef<"EmailGroup", 'String'>
    readonly company: FieldRef<"EmailGroup", 'String'>
    readonly emails: FieldRef<"EmailGroup", 'String[]'>
    readonly createdAt: FieldRef<"EmailGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"EmailGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmailGroup findUnique
   */
  export type EmailGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmailGroup to fetch.
     */
    where: EmailGroupWhereUniqueInput
  }

  /**
   * EmailGroup findUniqueOrThrow
   */
  export type EmailGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmailGroup to fetch.
     */
    where: EmailGroupWhereUniqueInput
  }

  /**
   * EmailGroup findFirst
   */
  export type EmailGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmailGroup to fetch.
     */
    where?: EmailGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailGroups to fetch.
     */
    orderBy?: EmailGroupOrderByWithRelationInput | EmailGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailGroups.
     */
    cursor?: EmailGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailGroups.
     */
    distinct?: EmailGroupScalarFieldEnum | EmailGroupScalarFieldEnum[]
  }

  /**
   * EmailGroup findFirstOrThrow
   */
  export type EmailGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmailGroup to fetch.
     */
    where?: EmailGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailGroups to fetch.
     */
    orderBy?: EmailGroupOrderByWithRelationInput | EmailGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmailGroups.
     */
    cursor?: EmailGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmailGroups.
     */
    distinct?: EmailGroupScalarFieldEnum | EmailGroupScalarFieldEnum[]
  }

  /**
   * EmailGroup findMany
   */
  export type EmailGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmailGroups to fetch.
     */
    where?: EmailGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmailGroups to fetch.
     */
    orderBy?: EmailGroupOrderByWithRelationInput | EmailGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmailGroups.
     */
    cursor?: EmailGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmailGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmailGroups.
     */
    skip?: number
    distinct?: EmailGroupScalarFieldEnum | EmailGroupScalarFieldEnum[]
  }

  /**
   * EmailGroup create
   */
  export type EmailGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a EmailGroup.
     */
    data: XOR<EmailGroupCreateInput, EmailGroupUncheckedCreateInput>
  }

  /**
   * EmailGroup createMany
   */
  export type EmailGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmailGroups.
     */
    data: EmailGroupCreateManyInput | EmailGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailGroup createManyAndReturn
   */
  export type EmailGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * The data used to create many EmailGroups.
     */
    data: EmailGroupCreateManyInput | EmailGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmailGroup update
   */
  export type EmailGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a EmailGroup.
     */
    data: XOR<EmailGroupUpdateInput, EmailGroupUncheckedUpdateInput>
    /**
     * Choose, which EmailGroup to update.
     */
    where: EmailGroupWhereUniqueInput
  }

  /**
   * EmailGroup updateMany
   */
  export type EmailGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmailGroups.
     */
    data: XOR<EmailGroupUpdateManyMutationInput, EmailGroupUncheckedUpdateManyInput>
    /**
     * Filter which EmailGroups to update
     */
    where?: EmailGroupWhereInput
    /**
     * Limit how many EmailGroups to update.
     */
    limit?: number
  }

  /**
   * EmailGroup updateManyAndReturn
   */
  export type EmailGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * The data used to update EmailGroups.
     */
    data: XOR<EmailGroupUpdateManyMutationInput, EmailGroupUncheckedUpdateManyInput>
    /**
     * Filter which EmailGroups to update
     */
    where?: EmailGroupWhereInput
    /**
     * Limit how many EmailGroups to update.
     */
    limit?: number
  }

  /**
   * EmailGroup upsert
   */
  export type EmailGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the EmailGroup to update in case it exists.
     */
    where: EmailGroupWhereUniqueInput
    /**
     * In case the EmailGroup found by the `where` argument doesn't exist, create a new EmailGroup with this data.
     */
    create: XOR<EmailGroupCreateInput, EmailGroupUncheckedCreateInput>
    /**
     * In case the EmailGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailGroupUpdateInput, EmailGroupUncheckedUpdateInput>
  }

  /**
   * EmailGroup delete
   */
  export type EmailGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
    /**
     * Filter which EmailGroup to delete.
     */
    where: EmailGroupWhereUniqueInput
  }

  /**
   * EmailGroup deleteMany
   */
  export type EmailGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmailGroups to delete
     */
    where?: EmailGroupWhereInput
    /**
     * Limit how many EmailGroups to delete.
     */
    limit?: number
  }

  /**
   * EmailGroup.rfps
   */
  export type EmailGroup$rfpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    where?: RFPWhereInput
    orderBy?: RFPOrderByWithRelationInput | RFPOrderByWithRelationInput[]
    cursor?: RFPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RFPScalarFieldEnum | RFPScalarFieldEnum[]
  }

  /**
   * EmailGroup without action
   */
  export type EmailGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailGroup
     */
    select?: EmailGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmailGroup
     */
    omit?: EmailGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailGroupInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    id: number | null
    rfpId: number | null
    daysExpected: number | null
  }

  export type JobSumAggregateOutputType = {
    id: number | null
    rfpId: number | null
    daysExpected: number | null
  }

  export type JobMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    rfpId: number | null
    jobType: string | null
    startDate: string | null
    daysExpected: number | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    rfpId: number | null
    jobType: string | null
    startDate: string | null
    daysExpected: number | null
    company: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    description: number
    rfpId: number
    jobType: number
    startDate: number
    daysExpected: number
    company: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    id?: true
    rfpId?: true
    daysExpected?: true
  }

  export type JobSumAggregateInputType = {
    id?: true
    rfpId?: true
    daysExpected?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rfpId?: true
    jobType?: true
    startDate?: true
    daysExpected?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rfpId?: true
    jobType?: true
    startDate?: true
    daysExpected?: true
    company?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    rfpId?: true
    jobType?: true
    startDate?: true
    daysExpected?: true
    company?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: number
    title: string | null
    description: string
    rfpId: number | null
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt: Date
    updatedAt: Date
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rfpId?: boolean
    jobType?: boolean
    startDate?: boolean
    daysExpected?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rfpId?: boolean
    jobType?: boolean
    startDate?: boolean
    daysExpected?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    rfpId?: boolean
    jobType?: boolean
    startDate?: boolean
    daysExpected?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    rfpId?: boolean
    jobType?: boolean
    startDate?: boolean
    daysExpected?: boolean
    company?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "rfpId" | "jobType" | "startDate" | "daysExpected" | "company" | "createdAt" | "updatedAt", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rfp?: boolean | Job$rfpArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      rfp: Prisma.$RFPPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      description: string
      rfpId: number | null
      jobType: string
      startDate: string
      daysExpected: number
      company: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
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
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
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
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rfp<T extends Job$rfpArgs<ExtArgs> = {}>(args?: Subset<T, Job$rfpArgs<ExtArgs>>): Prisma__RFPClient<$Result.GetResult<Prisma.$RFPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'Int'>
    readonly title: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly rfpId: FieldRef<"Job", 'Int'>
    readonly jobType: FieldRef<"Job", 'String'>
    readonly startDate: FieldRef<"Job", 'String'>
    readonly daysExpected: FieldRef<"Job", 'Int'>
    readonly company: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.rfp
   */
  export type Job$rfpArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RFP
     */
    select?: RFPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RFP
     */
    omit?: RFPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RFPInclude<ExtArgs> | null
    where?: RFPWhereInput
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model BidLineItem
   */

  export type AggregateBidLineItem = {
    _count: BidLineItemCountAggregateOutputType | null
    _avg: BidLineItemAvgAggregateOutputType | null
    _sum: BidLineItemSumAggregateOutputType | null
    _min: BidLineItemMinAggregateOutputType | null
    _max: BidLineItemMaxAggregateOutputType | null
  }

  export type BidLineItemAvgAggregateOutputType = {
    id: number | null
    bidId: number | null
    amount: number | null
  }

  export type BidLineItemSumAggregateOutputType = {
    id: number | null
    bidId: number | null
    amount: number | null
  }

  export type BidLineItemMinAggregateOutputType = {
    id: number | null
    bidId: number | null
    description: string | null
    amount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidLineItemMaxAggregateOutputType = {
    id: number | null
    bidId: number | null
    description: string | null
    amount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BidLineItemCountAggregateOutputType = {
    id: number
    bidId: number
    description: number
    amount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BidLineItemAvgAggregateInputType = {
    id?: true
    bidId?: true
    amount?: true
  }

  export type BidLineItemSumAggregateInputType = {
    id?: true
    bidId?: true
    amount?: true
  }

  export type BidLineItemMinAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidLineItemMaxAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BidLineItemCountAggregateInputType = {
    id?: true
    bidId?: true
    description?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BidLineItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BidLineItem to aggregate.
     */
    where?: BidLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidLineItems to fetch.
     */
    orderBy?: BidLineItemOrderByWithRelationInput | BidLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BidLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BidLineItems
    **/
    _count?: true | BidLineItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BidLineItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BidLineItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BidLineItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BidLineItemMaxAggregateInputType
  }

  export type GetBidLineItemAggregateType<T extends BidLineItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBidLineItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBidLineItem[P]>
      : GetScalarType<T[P], AggregateBidLineItem[P]>
  }




  export type BidLineItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BidLineItemWhereInput
    orderBy?: BidLineItemOrderByWithAggregationInput | BidLineItemOrderByWithAggregationInput[]
    by: BidLineItemScalarFieldEnum[] | BidLineItemScalarFieldEnum
    having?: BidLineItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BidLineItemCountAggregateInputType | true
    _avg?: BidLineItemAvgAggregateInputType
    _sum?: BidLineItemSumAggregateInputType
    _min?: BidLineItemMinAggregateInputType
    _max?: BidLineItemMaxAggregateInputType
  }

  export type BidLineItemGroupByOutputType = {
    id: number
    bidId: number
    description: string | null
    amount: number
    createdAt: Date
    updatedAt: Date
    _count: BidLineItemCountAggregateOutputType | null
    _avg: BidLineItemAvgAggregateOutputType | null
    _sum: BidLineItemSumAggregateOutputType | null
    _min: BidLineItemMinAggregateOutputType | null
    _max: BidLineItemMaxAggregateOutputType | null
  }

  type GetBidLineItemGroupByPayload<T extends BidLineItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BidLineItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BidLineItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BidLineItemGroupByOutputType[P]>
            : GetScalarType<T[P], BidLineItemGroupByOutputType[P]>
        }
      >
    >


  export type BidLineItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidLineItem"]>

  export type BidLineItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidLineItem"]>

  export type BidLineItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bidId?: boolean
    description?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bidLineItem"]>

  export type BidLineItemSelectScalar = {
    id?: boolean
    bidId?: boolean
    description?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BidLineItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bidId" | "description" | "amount" | "createdAt" | "updatedAt", ExtArgs["result"]["bidLineItem"]>
  export type BidLineItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }
  export type BidLineItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }
  export type BidLineItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bid?: boolean | BidDefaultArgs<ExtArgs>
  }

  export type $BidLineItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BidLineItem"
    objects: {
      bid: Prisma.$BidPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bidId: number
      description: string | null
      amount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bidLineItem"]>
    composites: {}
  }

  type BidLineItemGetPayload<S extends boolean | null | undefined | BidLineItemDefaultArgs> = $Result.GetResult<Prisma.$BidLineItemPayload, S>

  type BidLineItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BidLineItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BidLineItemCountAggregateInputType | true
    }

  export interface BidLineItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BidLineItem'], meta: { name: 'BidLineItem' } }
    /**
     * Find zero or one BidLineItem that matches the filter.
     * @param {BidLineItemFindUniqueArgs} args - Arguments to find a BidLineItem
     * @example
     * // Get one BidLineItem
     * const bidLineItem = await prisma.bidLineItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BidLineItemFindUniqueArgs>(args: SelectSubset<T, BidLineItemFindUniqueArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BidLineItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BidLineItemFindUniqueOrThrowArgs} args - Arguments to find a BidLineItem
     * @example
     * // Get one BidLineItem
     * const bidLineItem = await prisma.bidLineItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BidLineItemFindUniqueOrThrowArgs>(args: SelectSubset<T, BidLineItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BidLineItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemFindFirstArgs} args - Arguments to find a BidLineItem
     * @example
     * // Get one BidLineItem
     * const bidLineItem = await prisma.bidLineItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BidLineItemFindFirstArgs>(args?: SelectSubset<T, BidLineItemFindFirstArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BidLineItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemFindFirstOrThrowArgs} args - Arguments to find a BidLineItem
     * @example
     * // Get one BidLineItem
     * const bidLineItem = await prisma.bidLineItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BidLineItemFindFirstOrThrowArgs>(args?: SelectSubset<T, BidLineItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BidLineItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BidLineItems
     * const bidLineItems = await prisma.bidLineItem.findMany()
     * 
     * // Get first 10 BidLineItems
     * const bidLineItems = await prisma.bidLineItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bidLineItemWithIdOnly = await prisma.bidLineItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BidLineItemFindManyArgs>(args?: SelectSubset<T, BidLineItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BidLineItem.
     * @param {BidLineItemCreateArgs} args - Arguments to create a BidLineItem.
     * @example
     * // Create one BidLineItem
     * const BidLineItem = await prisma.bidLineItem.create({
     *   data: {
     *     // ... data to create a BidLineItem
     *   }
     * })
     * 
     */
    create<T extends BidLineItemCreateArgs>(args: SelectSubset<T, BidLineItemCreateArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BidLineItems.
     * @param {BidLineItemCreateManyArgs} args - Arguments to create many BidLineItems.
     * @example
     * // Create many BidLineItems
     * const bidLineItem = await prisma.bidLineItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BidLineItemCreateManyArgs>(args?: SelectSubset<T, BidLineItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BidLineItems and returns the data saved in the database.
     * @param {BidLineItemCreateManyAndReturnArgs} args - Arguments to create many BidLineItems.
     * @example
     * // Create many BidLineItems
     * const bidLineItem = await prisma.bidLineItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BidLineItems and only return the `id`
     * const bidLineItemWithIdOnly = await prisma.bidLineItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BidLineItemCreateManyAndReturnArgs>(args?: SelectSubset<T, BidLineItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BidLineItem.
     * @param {BidLineItemDeleteArgs} args - Arguments to delete one BidLineItem.
     * @example
     * // Delete one BidLineItem
     * const BidLineItem = await prisma.bidLineItem.delete({
     *   where: {
     *     // ... filter to delete one BidLineItem
     *   }
     * })
     * 
     */
    delete<T extends BidLineItemDeleteArgs>(args: SelectSubset<T, BidLineItemDeleteArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BidLineItem.
     * @param {BidLineItemUpdateArgs} args - Arguments to update one BidLineItem.
     * @example
     * // Update one BidLineItem
     * const bidLineItem = await prisma.bidLineItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BidLineItemUpdateArgs>(args: SelectSubset<T, BidLineItemUpdateArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BidLineItems.
     * @param {BidLineItemDeleteManyArgs} args - Arguments to filter BidLineItems to delete.
     * @example
     * // Delete a few BidLineItems
     * const { count } = await prisma.bidLineItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BidLineItemDeleteManyArgs>(args?: SelectSubset<T, BidLineItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BidLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BidLineItems
     * const bidLineItem = await prisma.bidLineItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BidLineItemUpdateManyArgs>(args: SelectSubset<T, BidLineItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BidLineItems and returns the data updated in the database.
     * @param {BidLineItemUpdateManyAndReturnArgs} args - Arguments to update many BidLineItems.
     * @example
     * // Update many BidLineItems
     * const bidLineItem = await prisma.bidLineItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BidLineItems and only return the `id`
     * const bidLineItemWithIdOnly = await prisma.bidLineItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends BidLineItemUpdateManyAndReturnArgs>(args: SelectSubset<T, BidLineItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BidLineItem.
     * @param {BidLineItemUpsertArgs} args - Arguments to update or create a BidLineItem.
     * @example
     * // Update or create a BidLineItem
     * const bidLineItem = await prisma.bidLineItem.upsert({
     *   create: {
     *     // ... data to create a BidLineItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BidLineItem we want to update
     *   }
     * })
     */
    upsert<T extends BidLineItemUpsertArgs>(args: SelectSubset<T, BidLineItemUpsertArgs<ExtArgs>>): Prisma__BidLineItemClient<$Result.GetResult<Prisma.$BidLineItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BidLineItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemCountArgs} args - Arguments to filter BidLineItems to count.
     * @example
     * // Count the number of BidLineItems
     * const count = await prisma.bidLineItem.count({
     *   where: {
     *     // ... the filter for the BidLineItems we want to count
     *   }
     * })
    **/
    count<T extends BidLineItemCountArgs>(
      args?: Subset<T, BidLineItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BidLineItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BidLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BidLineItemAggregateArgs>(args: Subset<T, BidLineItemAggregateArgs>): Prisma.PrismaPromise<GetBidLineItemAggregateType<T>>

    /**
     * Group by BidLineItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BidLineItemGroupByArgs} args - Group by arguments.
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
      T extends BidLineItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BidLineItemGroupByArgs['orderBy'] }
        : { orderBy?: BidLineItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BidLineItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBidLineItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BidLineItem model
   */
  readonly fields: BidLineItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BidLineItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BidLineItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bid<T extends BidDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BidDefaultArgs<ExtArgs>>): Prisma__BidClient<$Result.GetResult<Prisma.$BidPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BidLineItem model
   */
  interface BidLineItemFieldRefs {
    readonly id: FieldRef<"BidLineItem", 'Int'>
    readonly bidId: FieldRef<"BidLineItem", 'Int'>
    readonly description: FieldRef<"BidLineItem", 'String'>
    readonly amount: FieldRef<"BidLineItem", 'Float'>
    readonly createdAt: FieldRef<"BidLineItem", 'DateTime'>
    readonly updatedAt: FieldRef<"BidLineItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BidLineItem findUnique
   */
  export type BidLineItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter, which BidLineItem to fetch.
     */
    where: BidLineItemWhereUniqueInput
  }

  /**
   * BidLineItem findUniqueOrThrow
   */
  export type BidLineItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter, which BidLineItem to fetch.
     */
    where: BidLineItemWhereUniqueInput
  }

  /**
   * BidLineItem findFirst
   */
  export type BidLineItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter, which BidLineItem to fetch.
     */
    where?: BidLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidLineItems to fetch.
     */
    orderBy?: BidLineItemOrderByWithRelationInput | BidLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BidLineItems.
     */
    cursor?: BidLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BidLineItems.
     */
    distinct?: BidLineItemScalarFieldEnum | BidLineItemScalarFieldEnum[]
  }

  /**
   * BidLineItem findFirstOrThrow
   */
  export type BidLineItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter, which BidLineItem to fetch.
     */
    where?: BidLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidLineItems to fetch.
     */
    orderBy?: BidLineItemOrderByWithRelationInput | BidLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BidLineItems.
     */
    cursor?: BidLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidLineItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BidLineItems.
     */
    distinct?: BidLineItemScalarFieldEnum | BidLineItemScalarFieldEnum[]
  }

  /**
   * BidLineItem findMany
   */
  export type BidLineItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter, which BidLineItems to fetch.
     */
    where?: BidLineItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BidLineItems to fetch.
     */
    orderBy?: BidLineItemOrderByWithRelationInput | BidLineItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BidLineItems.
     */
    cursor?: BidLineItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BidLineItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BidLineItems.
     */
    skip?: number
    distinct?: BidLineItemScalarFieldEnum | BidLineItemScalarFieldEnum[]
  }

  /**
   * BidLineItem create
   */
  export type BidLineItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * The data needed to create a BidLineItem.
     */
    data: XOR<BidLineItemCreateInput, BidLineItemUncheckedCreateInput>
  }

  /**
   * BidLineItem createMany
   */
  export type BidLineItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BidLineItems.
     */
    data: BidLineItemCreateManyInput | BidLineItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BidLineItem createManyAndReturn
   */
  export type BidLineItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * The data used to create many BidLineItems.
     */
    data: BidLineItemCreateManyInput | BidLineItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BidLineItem update
   */
  export type BidLineItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * The data needed to update a BidLineItem.
     */
    data: XOR<BidLineItemUpdateInput, BidLineItemUncheckedUpdateInput>
    /**
     * Choose, which BidLineItem to update.
     */
    where: BidLineItemWhereUniqueInput
  }

  /**
   * BidLineItem updateMany
   */
  export type BidLineItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BidLineItems.
     */
    data: XOR<BidLineItemUpdateManyMutationInput, BidLineItemUncheckedUpdateManyInput>
    /**
     * Filter which BidLineItems to update
     */
    where?: BidLineItemWhereInput
    /**
     * Limit how many BidLineItems to update.
     */
    limit?: number
  }

  /**
   * BidLineItem updateManyAndReturn
   */
  export type BidLineItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * The data used to update BidLineItems.
     */
    data: XOR<BidLineItemUpdateManyMutationInput, BidLineItemUncheckedUpdateManyInput>
    /**
     * Filter which BidLineItems to update
     */
    where?: BidLineItemWhereInput
    /**
     * Limit how many BidLineItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BidLineItem upsert
   */
  export type BidLineItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * The filter to search for the BidLineItem to update in case it exists.
     */
    where: BidLineItemWhereUniqueInput
    /**
     * In case the BidLineItem found by the `where` argument doesn't exist, create a new BidLineItem with this data.
     */
    create: XOR<BidLineItemCreateInput, BidLineItemUncheckedCreateInput>
    /**
     * In case the BidLineItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BidLineItemUpdateInput, BidLineItemUncheckedUpdateInput>
  }

  /**
   * BidLineItem delete
   */
  export type BidLineItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
    /**
     * Filter which BidLineItem to delete.
     */
    where: BidLineItemWhereUniqueInput
  }

  /**
   * BidLineItem deleteMany
   */
  export type BidLineItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BidLineItems to delete
     */
    where?: BidLineItemWhereInput
    /**
     * Limit how many BidLineItems to delete.
     */
    limit?: number
  }

  /**
   * BidLineItem without action
   */
  export type BidLineItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BidLineItem
     */
    select?: BidLineItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BidLineItem
     */
    omit?: BidLineItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BidLineItemInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    companyId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    companyId: number | null
    passwordHash: string | null
    isAdmin: boolean | null
    emailVerified: boolean | null
    verificationToken: string | null
    verificationExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    companyId: number | null
    passwordHash: string | null
    isAdmin: boolean | null
    emailVerified: boolean | null
    verificationToken: string | null
    verificationExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    companyId: number
    passwordHash: number
    isAdmin: number
    emailVerified: number
    verificationToken: number
    verificationExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    companyId?: true
    passwordHash?: true
    isAdmin?: true
    emailVerified?: true
    verificationToken?: true
    verificationExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    companyId?: true
    passwordHash?: true
    isAdmin?: true
    emailVerified?: true
    verificationToken?: true
    verificationExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    companyId?: true
    passwordHash?: true
    isAdmin?: true
    emailVerified?: true
    verificationToken?: true
    verificationExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    companyId: number | null
    passwordHash: string
    isAdmin: boolean
    emailVerified: boolean
    verificationToken: string | null
    verificationExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    companyId?: boolean
    passwordHash?: boolean
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    verificationExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    companyId?: boolean
    passwordHash?: boolean
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    verificationExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    companyId?: boolean
    passwordHash?: boolean
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    verificationExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | User$companyArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    companyId?: boolean
    passwordHash?: boolean
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: boolean
    verificationExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "companyId" | "passwordHash" | "isAdmin" | "emailVerified" | "verificationToken" | "verificationExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | User$companyArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      firstName: string | null
      lastName: string | null
      companyId: number | null
      passwordHash: string
      isAdmin: boolean
      emailVerified: boolean
      verificationToken: string | null
      verificationExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends User$companyArgs<ExtArgs> = {}>(args?: Subset<T, User$companyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly companyId: FieldRef<"User", 'Int'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly verificationExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.company
   */
  export type User$companyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanySumAggregateOutputType = {
    id: number | null
  }

  export type CompanyMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    typeOfWork: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    typeOfWork: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    type: number
    typeOfWork: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyAvgAggregateInputType = {
    id?: true
  }

  export type CompanySumAggregateInputType = {
    id?: true
  }

  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    typeOfWork?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    typeOfWork?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    typeOfWork?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _avg?: CompanyAvgAggregateInputType
    _sum?: CompanySumAggregateInputType
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: number
    name: string | null
    type: string | null
    typeOfWork: string | null
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _avg: CompanyAvgAggregateOutputType | null
    _sum: CompanySumAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    typeOfWork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    typeOfWork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    typeOfWork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    typeOfWork?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "typeOfWork" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      type: string | null
      typeOfWork: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
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
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'Int'>
    readonly name: FieldRef<"Company", 'String'>
    readonly type: FieldRef<"Company", 'String'>
    readonly typeOfWork: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model JobType
   */

  export type AggregateJobType = {
    _count: JobTypeCountAggregateOutputType | null
    _avg: JobTypeAvgAggregateOutputType | null
    _sum: JobTypeSumAggregateOutputType | null
    _min: JobTypeMinAggregateOutputType | null
    _max: JobTypeMaxAggregateOutputType | null
  }

  export type JobTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type JobTypeSumAggregateOutputType = {
    id: number | null
  }

  export type JobTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JobTypeCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JobTypeAvgAggregateInputType = {
    id?: true
  }

  export type JobTypeSumAggregateInputType = {
    id?: true
  }

  export type JobTypeMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobTypeMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JobTypeCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JobTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobType to aggregate.
     */
    where?: JobTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobTypes to fetch.
     */
    orderBy?: JobTypeOrderByWithRelationInput | JobTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobTypes
    **/
    _count?: true | JobTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobTypeMaxAggregateInputType
  }

  export type GetJobTypeAggregateType<T extends JobTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateJobType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobType[P]>
      : GetScalarType<T[P], AggregateJobType[P]>
  }




  export type JobTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobTypeWhereInput
    orderBy?: JobTypeOrderByWithAggregationInput | JobTypeOrderByWithAggregationInput[]
    by: JobTypeScalarFieldEnum[] | JobTypeScalarFieldEnum
    having?: JobTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobTypeCountAggregateInputType | true
    _avg?: JobTypeAvgAggregateInputType
    _sum?: JobTypeSumAggregateInputType
    _min?: JobTypeMinAggregateInputType
    _max?: JobTypeMaxAggregateInputType
  }

  export type JobTypeGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    _count: JobTypeCountAggregateOutputType | null
    _avg: JobTypeAvgAggregateOutputType | null
    _sum: JobTypeSumAggregateOutputType | null
    _min: JobTypeMinAggregateOutputType | null
    _max: JobTypeMaxAggregateOutputType | null
  }

  type GetJobTypeGroupByPayload<T extends JobTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobTypeGroupByOutputType[P]>
            : GetScalarType<T[P], JobTypeGroupByOutputType[P]>
        }
      >
    >


  export type JobTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobType"]>

  export type JobTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobType"]>

  export type JobTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jobType"]>

  export type JobTypeSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JobTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["jobType"]>

  export type $JobTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jobType"]>
    composites: {}
  }

  type JobTypeGetPayload<S extends boolean | null | undefined | JobTypeDefaultArgs> = $Result.GetResult<Prisma.$JobTypePayload, S>

  type JobTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobTypeCountAggregateInputType | true
    }

  export interface JobTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobType'], meta: { name: 'JobType' } }
    /**
     * Find zero or one JobType that matches the filter.
     * @param {JobTypeFindUniqueArgs} args - Arguments to find a JobType
     * @example
     * // Get one JobType
     * const jobType = await prisma.jobType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobTypeFindUniqueArgs>(args: SelectSubset<T, JobTypeFindUniqueArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobTypeFindUniqueOrThrowArgs} args - Arguments to find a JobType
     * @example
     * // Get one JobType
     * const jobType = await prisma.jobType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, JobTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeFindFirstArgs} args - Arguments to find a JobType
     * @example
     * // Get one JobType
     * const jobType = await prisma.jobType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobTypeFindFirstArgs>(args?: SelectSubset<T, JobTypeFindFirstArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeFindFirstOrThrowArgs} args - Arguments to find a JobType
     * @example
     * // Get one JobType
     * const jobType = await prisma.jobType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, JobTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobTypes
     * const jobTypes = await prisma.jobType.findMany()
     * 
     * // Get first 10 JobTypes
     * const jobTypes = await prisma.jobType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobTypeWithIdOnly = await prisma.jobType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobTypeFindManyArgs>(args?: SelectSubset<T, JobTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobType.
     * @param {JobTypeCreateArgs} args - Arguments to create a JobType.
     * @example
     * // Create one JobType
     * const JobType = await prisma.jobType.create({
     *   data: {
     *     // ... data to create a JobType
     *   }
     * })
     * 
     */
    create<T extends JobTypeCreateArgs>(args: SelectSubset<T, JobTypeCreateArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobTypes.
     * @param {JobTypeCreateManyArgs} args - Arguments to create many JobTypes.
     * @example
     * // Create many JobTypes
     * const jobType = await prisma.jobType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobTypeCreateManyArgs>(args?: SelectSubset<T, JobTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JobTypes and returns the data saved in the database.
     * @param {JobTypeCreateManyAndReturnArgs} args - Arguments to create many JobTypes.
     * @example
     * // Create many JobTypes
     * const jobType = await prisma.jobType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JobTypes and only return the `id`
     * const jobTypeWithIdOnly = await prisma.jobType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, JobTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JobType.
     * @param {JobTypeDeleteArgs} args - Arguments to delete one JobType.
     * @example
     * // Delete one JobType
     * const JobType = await prisma.jobType.delete({
     *   where: {
     *     // ... filter to delete one JobType
     *   }
     * })
     * 
     */
    delete<T extends JobTypeDeleteArgs>(args: SelectSubset<T, JobTypeDeleteArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobType.
     * @param {JobTypeUpdateArgs} args - Arguments to update one JobType.
     * @example
     * // Update one JobType
     * const jobType = await prisma.jobType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobTypeUpdateArgs>(args: SelectSubset<T, JobTypeUpdateArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobTypes.
     * @param {JobTypeDeleteManyArgs} args - Arguments to filter JobTypes to delete.
     * @example
     * // Delete a few JobTypes
     * const { count } = await prisma.jobType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobTypeDeleteManyArgs>(args?: SelectSubset<T, JobTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobTypes
     * const jobType = await prisma.jobType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobTypeUpdateManyArgs>(args: SelectSubset<T, JobTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobTypes and returns the data updated in the database.
     * @param {JobTypeUpdateManyAndReturnArgs} args - Arguments to update many JobTypes.
     * @example
     * // Update many JobTypes
     * const jobType = await prisma.jobType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JobTypes and only return the `id`
     * const jobTypeWithIdOnly = await prisma.jobType.updateManyAndReturn({
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
    updateManyAndReturn<T extends JobTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, JobTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JobType.
     * @param {JobTypeUpsertArgs} args - Arguments to update or create a JobType.
     * @example
     * // Update or create a JobType
     * const jobType = await prisma.jobType.upsert({
     *   create: {
     *     // ... data to create a JobType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobType we want to update
     *   }
     * })
     */
    upsert<T extends JobTypeUpsertArgs>(args: SelectSubset<T, JobTypeUpsertArgs<ExtArgs>>): Prisma__JobTypeClient<$Result.GetResult<Prisma.$JobTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeCountArgs} args - Arguments to filter JobTypes to count.
     * @example
     * // Count the number of JobTypes
     * const count = await prisma.jobType.count({
     *   where: {
     *     // ... the filter for the JobTypes we want to count
     *   }
     * })
    **/
    count<T extends JobTypeCountArgs>(
      args?: Subset<T, JobTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobTypeAggregateArgs>(args: Subset<T, JobTypeAggregateArgs>): Prisma.PrismaPromise<GetJobTypeAggregateType<T>>

    /**
     * Group by JobType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobTypeGroupByArgs} args - Group by arguments.
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
      T extends JobTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobTypeGroupByArgs['orderBy'] }
        : { orderBy?: JobTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobType model
   */
  readonly fields: JobTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the JobType model
   */
  interface JobTypeFieldRefs {
    readonly id: FieldRef<"JobType", 'Int'>
    readonly name: FieldRef<"JobType", 'String'>
    readonly createdAt: FieldRef<"JobType", 'DateTime'>
    readonly updatedAt: FieldRef<"JobType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JobType findUnique
   */
  export type JobTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter, which JobType to fetch.
     */
    where: JobTypeWhereUniqueInput
  }

  /**
   * JobType findUniqueOrThrow
   */
  export type JobTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter, which JobType to fetch.
     */
    where: JobTypeWhereUniqueInput
  }

  /**
   * JobType findFirst
   */
  export type JobTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter, which JobType to fetch.
     */
    where?: JobTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobTypes to fetch.
     */
    orderBy?: JobTypeOrderByWithRelationInput | JobTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobTypes.
     */
    cursor?: JobTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobTypes.
     */
    distinct?: JobTypeScalarFieldEnum | JobTypeScalarFieldEnum[]
  }

  /**
   * JobType findFirstOrThrow
   */
  export type JobTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter, which JobType to fetch.
     */
    where?: JobTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobTypes to fetch.
     */
    orderBy?: JobTypeOrderByWithRelationInput | JobTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobTypes.
     */
    cursor?: JobTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobTypes.
     */
    distinct?: JobTypeScalarFieldEnum | JobTypeScalarFieldEnum[]
  }

  /**
   * JobType findMany
   */
  export type JobTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter, which JobTypes to fetch.
     */
    where?: JobTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobTypes to fetch.
     */
    orderBy?: JobTypeOrderByWithRelationInput | JobTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobTypes.
     */
    cursor?: JobTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobTypes.
     */
    skip?: number
    distinct?: JobTypeScalarFieldEnum | JobTypeScalarFieldEnum[]
  }

  /**
   * JobType create
   */
  export type JobTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * The data needed to create a JobType.
     */
    data: XOR<JobTypeCreateInput, JobTypeUncheckedCreateInput>
  }

  /**
   * JobType createMany
   */
  export type JobTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobTypes.
     */
    data: JobTypeCreateManyInput | JobTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobType createManyAndReturn
   */
  export type JobTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * The data used to create many JobTypes.
     */
    data: JobTypeCreateManyInput | JobTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobType update
   */
  export type JobTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * The data needed to update a JobType.
     */
    data: XOR<JobTypeUpdateInput, JobTypeUncheckedUpdateInput>
    /**
     * Choose, which JobType to update.
     */
    where: JobTypeWhereUniqueInput
  }

  /**
   * JobType updateMany
   */
  export type JobTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobTypes.
     */
    data: XOR<JobTypeUpdateManyMutationInput, JobTypeUncheckedUpdateManyInput>
    /**
     * Filter which JobTypes to update
     */
    where?: JobTypeWhereInput
    /**
     * Limit how many JobTypes to update.
     */
    limit?: number
  }

  /**
   * JobType updateManyAndReturn
   */
  export type JobTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * The data used to update JobTypes.
     */
    data: XOR<JobTypeUpdateManyMutationInput, JobTypeUncheckedUpdateManyInput>
    /**
     * Filter which JobTypes to update
     */
    where?: JobTypeWhereInput
    /**
     * Limit how many JobTypes to update.
     */
    limit?: number
  }

  /**
   * JobType upsert
   */
  export type JobTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * The filter to search for the JobType to update in case it exists.
     */
    where: JobTypeWhereUniqueInput
    /**
     * In case the JobType found by the `where` argument doesn't exist, create a new JobType with this data.
     */
    create: XOR<JobTypeCreateInput, JobTypeUncheckedCreateInput>
    /**
     * In case the JobType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobTypeUpdateInput, JobTypeUncheckedUpdateInput>
  }

  /**
   * JobType delete
   */
  export type JobTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
    /**
     * Filter which JobType to delete.
     */
    where: JobTypeWhereUniqueInput
  }

  /**
   * JobType deleteMany
   */
  export type JobTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobTypes to delete
     */
    where?: JobTypeWhereInput
    /**
     * Limit how many JobTypes to delete.
     */
    limit?: number
  }

  /**
   * JobType without action
   */
  export type JobTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobType
     */
    select?: JobTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobType
     */
    omit?: JobTypeOmit<ExtArgs> | null
  }


  /**
   * Model CompanyFinancial
   */

  export type AggregateCompanyFinancial = {
    _count: CompanyFinancialCountAggregateOutputType | null
    _avg: CompanyFinancialAvgAggregateOutputType | null
    _sum: CompanyFinancialSumAggregateOutputType | null
    _min: CompanyFinancialMinAggregateOutputType | null
    _max: CompanyFinancialMaxAggregateOutputType | null
  }

  export type CompanyFinancialAvgAggregateOutputType = {
    id: number | null
    routing: number | null
    account: number | null
  }

  export type CompanyFinancialSumAggregateOutputType = {
    id: number | null
    routing: number | null
    account: number | null
  }

  export type CompanyFinancialMinAggregateOutputType = {
    id: number | null
    routing: number | null
    account: number | null
  }

  export type CompanyFinancialMaxAggregateOutputType = {
    id: number | null
    routing: number | null
    account: number | null
  }

  export type CompanyFinancialCountAggregateOutputType = {
    id: number
    routing: number
    account: number
    _all: number
  }


  export type CompanyFinancialAvgAggregateInputType = {
    id?: true
    routing?: true
    account?: true
  }

  export type CompanyFinancialSumAggregateInputType = {
    id?: true
    routing?: true
    account?: true
  }

  export type CompanyFinancialMinAggregateInputType = {
    id?: true
    routing?: true
    account?: true
  }

  export type CompanyFinancialMaxAggregateInputType = {
    id?: true
    routing?: true
    account?: true
  }

  export type CompanyFinancialCountAggregateInputType = {
    id?: true
    routing?: true
    account?: true
    _all?: true
  }

  export type CompanyFinancialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyFinancial to aggregate.
     */
    where?: CompanyFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyFinancials to fetch.
     */
    orderBy?: CompanyFinancialOrderByWithRelationInput | CompanyFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyFinancials
    **/
    _count?: true | CompanyFinancialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyFinancialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyFinancialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyFinancialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyFinancialMaxAggregateInputType
  }

  export type GetCompanyFinancialAggregateType<T extends CompanyFinancialAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyFinancial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyFinancial[P]>
      : GetScalarType<T[P], AggregateCompanyFinancial[P]>
  }




  export type CompanyFinancialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyFinancialWhereInput
    orderBy?: CompanyFinancialOrderByWithAggregationInput | CompanyFinancialOrderByWithAggregationInput[]
    by: CompanyFinancialScalarFieldEnum[] | CompanyFinancialScalarFieldEnum
    having?: CompanyFinancialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyFinancialCountAggregateInputType | true
    _avg?: CompanyFinancialAvgAggregateInputType
    _sum?: CompanyFinancialSumAggregateInputType
    _min?: CompanyFinancialMinAggregateInputType
    _max?: CompanyFinancialMaxAggregateInputType
  }

  export type CompanyFinancialGroupByOutputType = {
    id: number
    routing: number
    account: number
    _count: CompanyFinancialCountAggregateOutputType | null
    _avg: CompanyFinancialAvgAggregateOutputType | null
    _sum: CompanyFinancialSumAggregateOutputType | null
    _min: CompanyFinancialMinAggregateOutputType | null
    _max: CompanyFinancialMaxAggregateOutputType | null
  }

  type GetCompanyFinancialGroupByPayload<T extends CompanyFinancialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyFinancialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyFinancialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyFinancialGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyFinancialGroupByOutputType[P]>
        }
      >
    >


  export type CompanyFinancialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routing?: boolean
    account?: boolean
  }, ExtArgs["result"]["companyFinancial"]>

  export type CompanyFinancialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routing?: boolean
    account?: boolean
  }, ExtArgs["result"]["companyFinancial"]>

  export type CompanyFinancialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    routing?: boolean
    account?: boolean
  }, ExtArgs["result"]["companyFinancial"]>

  export type CompanyFinancialSelectScalar = {
    id?: boolean
    routing?: boolean
    account?: boolean
  }

  export type CompanyFinancialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "routing" | "account", ExtArgs["result"]["companyFinancial"]>

  export type $CompanyFinancialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyFinancial"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      routing: number
      account: number
    }, ExtArgs["result"]["companyFinancial"]>
    composites: {}
  }

  type CompanyFinancialGetPayload<S extends boolean | null | undefined | CompanyFinancialDefaultArgs> = $Result.GetResult<Prisma.$CompanyFinancialPayload, S>

  type CompanyFinancialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFinancialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyFinancialCountAggregateInputType | true
    }

  export interface CompanyFinancialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyFinancial'], meta: { name: 'CompanyFinancial' } }
    /**
     * Find zero or one CompanyFinancial that matches the filter.
     * @param {CompanyFinancialFindUniqueArgs} args - Arguments to find a CompanyFinancial
     * @example
     * // Get one CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFinancialFindUniqueArgs>(args: SelectSubset<T, CompanyFinancialFindUniqueArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyFinancial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFinancialFindUniqueOrThrowArgs} args - Arguments to find a CompanyFinancial
     * @example
     * // Get one CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFinancialFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFinancialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyFinancial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialFindFirstArgs} args - Arguments to find a CompanyFinancial
     * @example
     * // Get one CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFinancialFindFirstArgs>(args?: SelectSubset<T, CompanyFinancialFindFirstArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyFinancial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialFindFirstOrThrowArgs} args - Arguments to find a CompanyFinancial
     * @example
     * // Get one CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFinancialFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFinancialFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyFinancials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyFinancials
     * const companyFinancials = await prisma.companyFinancial.findMany()
     * 
     * // Get first 10 CompanyFinancials
     * const companyFinancials = await prisma.companyFinancial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyFinancialWithIdOnly = await prisma.companyFinancial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFinancialFindManyArgs>(args?: SelectSubset<T, CompanyFinancialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyFinancial.
     * @param {CompanyFinancialCreateArgs} args - Arguments to create a CompanyFinancial.
     * @example
     * // Create one CompanyFinancial
     * const CompanyFinancial = await prisma.companyFinancial.create({
     *   data: {
     *     // ... data to create a CompanyFinancial
     *   }
     * })
     * 
     */
    create<T extends CompanyFinancialCreateArgs>(args: SelectSubset<T, CompanyFinancialCreateArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyFinancials.
     * @param {CompanyFinancialCreateManyArgs} args - Arguments to create many CompanyFinancials.
     * @example
     * // Create many CompanyFinancials
     * const companyFinancial = await prisma.companyFinancial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyFinancialCreateManyArgs>(args?: SelectSubset<T, CompanyFinancialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompanyFinancials and returns the data saved in the database.
     * @param {CompanyFinancialCreateManyAndReturnArgs} args - Arguments to create many CompanyFinancials.
     * @example
     * // Create many CompanyFinancials
     * const companyFinancial = await prisma.companyFinancial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompanyFinancials and only return the `id`
     * const companyFinancialWithIdOnly = await prisma.companyFinancial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyFinancialCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyFinancialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompanyFinancial.
     * @param {CompanyFinancialDeleteArgs} args - Arguments to delete one CompanyFinancial.
     * @example
     * // Delete one CompanyFinancial
     * const CompanyFinancial = await prisma.companyFinancial.delete({
     *   where: {
     *     // ... filter to delete one CompanyFinancial
     *   }
     * })
     * 
     */
    delete<T extends CompanyFinancialDeleteArgs>(args: SelectSubset<T, CompanyFinancialDeleteArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyFinancial.
     * @param {CompanyFinancialUpdateArgs} args - Arguments to update one CompanyFinancial.
     * @example
     * // Update one CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyFinancialUpdateArgs>(args: SelectSubset<T, CompanyFinancialUpdateArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyFinancials.
     * @param {CompanyFinancialDeleteManyArgs} args - Arguments to filter CompanyFinancials to delete.
     * @example
     * // Delete a few CompanyFinancials
     * const { count } = await prisma.companyFinancial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyFinancialDeleteManyArgs>(args?: SelectSubset<T, CompanyFinancialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyFinancials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyFinancials
     * const companyFinancial = await prisma.companyFinancial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyFinancialUpdateManyArgs>(args: SelectSubset<T, CompanyFinancialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyFinancials and returns the data updated in the database.
     * @param {CompanyFinancialUpdateManyAndReturnArgs} args - Arguments to update many CompanyFinancials.
     * @example
     * // Update many CompanyFinancials
     * const companyFinancial = await prisma.companyFinancial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CompanyFinancials and only return the `id`
     * const companyFinancialWithIdOnly = await prisma.companyFinancial.updateManyAndReturn({
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
    updateManyAndReturn<T extends CompanyFinancialUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyFinancialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CompanyFinancial.
     * @param {CompanyFinancialUpsertArgs} args - Arguments to update or create a CompanyFinancial.
     * @example
     * // Update or create a CompanyFinancial
     * const companyFinancial = await prisma.companyFinancial.upsert({
     *   create: {
     *     // ... data to create a CompanyFinancial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyFinancial we want to update
     *   }
     * })
     */
    upsert<T extends CompanyFinancialUpsertArgs>(args: SelectSubset<T, CompanyFinancialUpsertArgs<ExtArgs>>): Prisma__CompanyFinancialClient<$Result.GetResult<Prisma.$CompanyFinancialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyFinancials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialCountArgs} args - Arguments to filter CompanyFinancials to count.
     * @example
     * // Count the number of CompanyFinancials
     * const count = await prisma.companyFinancial.count({
     *   where: {
     *     // ... the filter for the CompanyFinancials we want to count
     *   }
     * })
    **/
    count<T extends CompanyFinancialCountArgs>(
      args?: Subset<T, CompanyFinancialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyFinancialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyFinancial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyFinancialAggregateArgs>(args: Subset<T, CompanyFinancialAggregateArgs>): Prisma.PrismaPromise<GetCompanyFinancialAggregateType<T>>

    /**
     * Group by CompanyFinancial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFinancialGroupByArgs} args - Group by arguments.
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
      T extends CompanyFinancialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyFinancialGroupByArgs['orderBy'] }
        : { orderBy?: CompanyFinancialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyFinancialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyFinancialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyFinancial model
   */
  readonly fields: CompanyFinancialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyFinancial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyFinancialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the CompanyFinancial model
   */
  interface CompanyFinancialFieldRefs {
    readonly id: FieldRef<"CompanyFinancial", 'Int'>
    readonly routing: FieldRef<"CompanyFinancial", 'Int'>
    readonly account: FieldRef<"CompanyFinancial", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CompanyFinancial findUnique
   */
  export type CompanyFinancialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter, which CompanyFinancial to fetch.
     */
    where: CompanyFinancialWhereUniqueInput
  }

  /**
   * CompanyFinancial findUniqueOrThrow
   */
  export type CompanyFinancialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter, which CompanyFinancial to fetch.
     */
    where: CompanyFinancialWhereUniqueInput
  }

  /**
   * CompanyFinancial findFirst
   */
  export type CompanyFinancialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter, which CompanyFinancial to fetch.
     */
    where?: CompanyFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyFinancials to fetch.
     */
    orderBy?: CompanyFinancialOrderByWithRelationInput | CompanyFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyFinancials.
     */
    cursor?: CompanyFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyFinancials.
     */
    distinct?: CompanyFinancialScalarFieldEnum | CompanyFinancialScalarFieldEnum[]
  }

  /**
   * CompanyFinancial findFirstOrThrow
   */
  export type CompanyFinancialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter, which CompanyFinancial to fetch.
     */
    where?: CompanyFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyFinancials to fetch.
     */
    orderBy?: CompanyFinancialOrderByWithRelationInput | CompanyFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyFinancials.
     */
    cursor?: CompanyFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyFinancials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyFinancials.
     */
    distinct?: CompanyFinancialScalarFieldEnum | CompanyFinancialScalarFieldEnum[]
  }

  /**
   * CompanyFinancial findMany
   */
  export type CompanyFinancialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter, which CompanyFinancials to fetch.
     */
    where?: CompanyFinancialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyFinancials to fetch.
     */
    orderBy?: CompanyFinancialOrderByWithRelationInput | CompanyFinancialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyFinancials.
     */
    cursor?: CompanyFinancialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyFinancials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyFinancials.
     */
    skip?: number
    distinct?: CompanyFinancialScalarFieldEnum | CompanyFinancialScalarFieldEnum[]
  }

  /**
   * CompanyFinancial create
   */
  export type CompanyFinancialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * The data needed to create a CompanyFinancial.
     */
    data: XOR<CompanyFinancialCreateInput, CompanyFinancialUncheckedCreateInput>
  }

  /**
   * CompanyFinancial createMany
   */
  export type CompanyFinancialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyFinancials.
     */
    data: CompanyFinancialCreateManyInput | CompanyFinancialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyFinancial createManyAndReturn
   */
  export type CompanyFinancialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * The data used to create many CompanyFinancials.
     */
    data: CompanyFinancialCreateManyInput | CompanyFinancialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyFinancial update
   */
  export type CompanyFinancialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * The data needed to update a CompanyFinancial.
     */
    data: XOR<CompanyFinancialUpdateInput, CompanyFinancialUncheckedUpdateInput>
    /**
     * Choose, which CompanyFinancial to update.
     */
    where: CompanyFinancialWhereUniqueInput
  }

  /**
   * CompanyFinancial updateMany
   */
  export type CompanyFinancialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyFinancials.
     */
    data: XOR<CompanyFinancialUpdateManyMutationInput, CompanyFinancialUncheckedUpdateManyInput>
    /**
     * Filter which CompanyFinancials to update
     */
    where?: CompanyFinancialWhereInput
    /**
     * Limit how many CompanyFinancials to update.
     */
    limit?: number
  }

  /**
   * CompanyFinancial updateManyAndReturn
   */
  export type CompanyFinancialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * The data used to update CompanyFinancials.
     */
    data: XOR<CompanyFinancialUpdateManyMutationInput, CompanyFinancialUncheckedUpdateManyInput>
    /**
     * Filter which CompanyFinancials to update
     */
    where?: CompanyFinancialWhereInput
    /**
     * Limit how many CompanyFinancials to update.
     */
    limit?: number
  }

  /**
   * CompanyFinancial upsert
   */
  export type CompanyFinancialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * The filter to search for the CompanyFinancial to update in case it exists.
     */
    where: CompanyFinancialWhereUniqueInput
    /**
     * In case the CompanyFinancial found by the `where` argument doesn't exist, create a new CompanyFinancial with this data.
     */
    create: XOR<CompanyFinancialCreateInput, CompanyFinancialUncheckedCreateInput>
    /**
     * In case the CompanyFinancial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyFinancialUpdateInput, CompanyFinancialUncheckedUpdateInput>
  }

  /**
   * CompanyFinancial delete
   */
  export type CompanyFinancialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
    /**
     * Filter which CompanyFinancial to delete.
     */
    where: CompanyFinancialWhereUniqueInput
  }

  /**
   * CompanyFinancial deleteMany
   */
  export type CompanyFinancialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyFinancials to delete
     */
    where?: CompanyFinancialWhereInput
    /**
     * Limit how many CompanyFinancials to delete.
     */
    limit?: number
  }

  /**
   * CompanyFinancial without action
   */
  export type CompanyFinancialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyFinancial
     */
    select?: CompanyFinancialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyFinancial
     */
    omit?: CompanyFinancialOmit<ExtArgs> | null
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


  export const BidScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    approved: 'approved',
    user: 'user',
    company: 'company',
    info: 'info',
    expectedDate: 'expectedDate',
    rfpId: 'rfpId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BidScalarFieldEnum = (typeof BidScalarFieldEnum)[keyof typeof BidScalarFieldEnum]


  export const BidPostingScalarFieldEnum: {
    id: 'id',
    bidId: 'bidId',
    description: 'description',
    type: 'type',
    images: 'images',
    attributes: 'attributes',
    selectedOffer: 'selectedOffer',
    company: 'company',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BidPostingScalarFieldEnum = (typeof BidPostingScalarFieldEnum)[keyof typeof BidPostingScalarFieldEnum]


  export const RFPScalarFieldEnum: {
    id: 'id',
    currentBids: 'currentBids',
    description: 'description',
    jobType: 'jobType',
    images: 'images',
    attributes: 'attributes',
    originalCompany: 'originalCompany',
    status: 'status',
    startDate: 'startDate',
    bidsDueDate: 'bidsDueDate',
    emailList: 'emailList',
    emailGroupId: 'emailGroupId',
    title: 'title',
    User: 'User',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RFPScalarFieldEnum = (typeof RFPScalarFieldEnum)[keyof typeof RFPScalarFieldEnum]


  export const EmailGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    company: 'company',
    emails: 'emails',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmailGroupScalarFieldEnum = (typeof EmailGroupScalarFieldEnum)[keyof typeof EmailGroupScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    rfpId: 'rfpId',
    jobType: 'jobType',
    startDate: 'startDate',
    daysExpected: 'daysExpected',
    company: 'company',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const BidLineItemScalarFieldEnum: {
    id: 'id',
    bidId: 'bidId',
    description: 'description',
    amount: 'amount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BidLineItemScalarFieldEnum = (typeof BidLineItemScalarFieldEnum)[keyof typeof BidLineItemScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    companyId: 'companyId',
    passwordHash: 'passwordHash',
    isAdmin: 'isAdmin',
    emailVerified: 'emailVerified',
    verificationToken: 'verificationToken',
    verificationExpiry: 'verificationExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    typeOfWork: 'typeOfWork',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const JobTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JobTypeScalarFieldEnum = (typeof JobTypeScalarFieldEnum)[keyof typeof JobTypeScalarFieldEnum]


  export const CompanyFinancialScalarFieldEnum: {
    id: 'id',
    routing: 'routing',
    account: 'account'
  };

  export type CompanyFinancialScalarFieldEnum = (typeof CompanyFinancialScalarFieldEnum)[keyof typeof CompanyFinancialScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type BidWhereInput = {
    AND?: BidWhereInput | BidWhereInput[]
    OR?: BidWhereInput[]
    NOT?: BidWhereInput | BidWhereInput[]
    id?: IntFilter<"Bid"> | number
    amount?: FloatFilter<"Bid"> | number
    approved?: BoolFilter<"Bid"> | boolean
    user?: StringNullableFilter<"Bid"> | string | null
    company?: StringNullableFilter<"Bid"> | string | null
    info?: StringNullableFilter<"Bid"> | string | null
    expectedDate?: DateTimeNullableFilter<"Bid"> | Date | string | null
    rfpId?: IntNullableFilter<"Bid"> | number | null
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
    rfp?: XOR<RFPNullableScalarRelationFilter, RFPWhereInput> | null
    postings?: BidPostingListRelationFilter
    lineItems?: BidLineItemListRelationFilter
  }

  export type BidOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    approved?: SortOrder
    user?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    info?: SortOrderInput | SortOrder
    expectedDate?: SortOrderInput | SortOrder
    rfpId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rfp?: RFPOrderByWithRelationInput
    postings?: BidPostingOrderByRelationAggregateInput
    lineItems?: BidLineItemOrderByRelationAggregateInput
  }

  export type BidWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BidWhereInput | BidWhereInput[]
    OR?: BidWhereInput[]
    NOT?: BidWhereInput | BidWhereInput[]
    amount?: FloatFilter<"Bid"> | number
    approved?: BoolFilter<"Bid"> | boolean
    user?: StringNullableFilter<"Bid"> | string | null
    company?: StringNullableFilter<"Bid"> | string | null
    info?: StringNullableFilter<"Bid"> | string | null
    expectedDate?: DateTimeNullableFilter<"Bid"> | Date | string | null
    rfpId?: IntNullableFilter<"Bid"> | number | null
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
    rfp?: XOR<RFPNullableScalarRelationFilter, RFPWhereInput> | null
    postings?: BidPostingListRelationFilter
    lineItems?: BidLineItemListRelationFilter
  }, "id">

  export type BidOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    approved?: SortOrder
    user?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    info?: SortOrderInput | SortOrder
    expectedDate?: SortOrderInput | SortOrder
    rfpId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BidCountOrderByAggregateInput
    _avg?: BidAvgOrderByAggregateInput
    _max?: BidMaxOrderByAggregateInput
    _min?: BidMinOrderByAggregateInput
    _sum?: BidSumOrderByAggregateInput
  }

  export type BidScalarWhereWithAggregatesInput = {
    AND?: BidScalarWhereWithAggregatesInput | BidScalarWhereWithAggregatesInput[]
    OR?: BidScalarWhereWithAggregatesInput[]
    NOT?: BidScalarWhereWithAggregatesInput | BidScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Bid"> | number
    amount?: FloatWithAggregatesFilter<"Bid"> | number
    approved?: BoolWithAggregatesFilter<"Bid"> | boolean
    user?: StringNullableWithAggregatesFilter<"Bid"> | string | null
    company?: StringNullableWithAggregatesFilter<"Bid"> | string | null
    info?: StringNullableWithAggregatesFilter<"Bid"> | string | null
    expectedDate?: DateTimeNullableWithAggregatesFilter<"Bid"> | Date | string | null
    rfpId?: IntNullableWithAggregatesFilter<"Bid"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Bid"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Bid"> | Date | string
  }

  export type BidPostingWhereInput = {
    AND?: BidPostingWhereInput | BidPostingWhereInput[]
    OR?: BidPostingWhereInput[]
    NOT?: BidPostingWhereInput | BidPostingWhereInput[]
    id?: IntFilter<"BidPosting"> | number
    bidId?: IntFilter<"BidPosting"> | number
    description?: StringNullableFilter<"BidPosting"> | string | null
    type?: StringNullableFilter<"BidPosting"> | string | null
    images?: JsonNullableFilter<"BidPosting">
    attributes?: JsonNullableFilter<"BidPosting">
    selectedOffer?: IntNullableFilter<"BidPosting"> | number | null
    company?: StringNullableFilter<"BidPosting"> | string | null
    createdAt?: DateTimeFilter<"BidPosting"> | Date | string
    updatedAt?: DateTimeFilter<"BidPosting"> | Date | string
    bid?: XOR<BidScalarRelationFilter, BidWhereInput>
  }

  export type BidPostingOrderByWithRelationInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    selectedOffer?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bid?: BidOrderByWithRelationInput
  }

  export type BidPostingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BidPostingWhereInput | BidPostingWhereInput[]
    OR?: BidPostingWhereInput[]
    NOT?: BidPostingWhereInput | BidPostingWhereInput[]
    bidId?: IntFilter<"BidPosting"> | number
    description?: StringNullableFilter<"BidPosting"> | string | null
    type?: StringNullableFilter<"BidPosting"> | string | null
    images?: JsonNullableFilter<"BidPosting">
    attributes?: JsonNullableFilter<"BidPosting">
    selectedOffer?: IntNullableFilter<"BidPosting"> | number | null
    company?: StringNullableFilter<"BidPosting"> | string | null
    createdAt?: DateTimeFilter<"BidPosting"> | Date | string
    updatedAt?: DateTimeFilter<"BidPosting"> | Date | string
    bid?: XOR<BidScalarRelationFilter, BidWhereInput>
  }, "id">

  export type BidPostingOrderByWithAggregationInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    selectedOffer?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BidPostingCountOrderByAggregateInput
    _avg?: BidPostingAvgOrderByAggregateInput
    _max?: BidPostingMaxOrderByAggregateInput
    _min?: BidPostingMinOrderByAggregateInput
    _sum?: BidPostingSumOrderByAggregateInput
  }

  export type BidPostingScalarWhereWithAggregatesInput = {
    AND?: BidPostingScalarWhereWithAggregatesInput | BidPostingScalarWhereWithAggregatesInput[]
    OR?: BidPostingScalarWhereWithAggregatesInput[]
    NOT?: BidPostingScalarWhereWithAggregatesInput | BidPostingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BidPosting"> | number
    bidId?: IntWithAggregatesFilter<"BidPosting"> | number
    description?: StringNullableWithAggregatesFilter<"BidPosting"> | string | null
    type?: StringNullableWithAggregatesFilter<"BidPosting"> | string | null
    images?: JsonNullableWithAggregatesFilter<"BidPosting">
    attributes?: JsonNullableWithAggregatesFilter<"BidPosting">
    selectedOffer?: IntNullableWithAggregatesFilter<"BidPosting"> | number | null
    company?: StringNullableWithAggregatesFilter<"BidPosting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BidPosting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BidPosting"> | Date | string
  }

  export type RFPWhereInput = {
    AND?: RFPWhereInput | RFPWhereInput[]
    OR?: RFPWhereInput[]
    NOT?: RFPWhereInput | RFPWhereInput[]
    id?: IntFilter<"RFP"> | number
    currentBids?: IntNullableFilter<"RFP"> | number | null
    description?: StringNullableFilter<"RFP"> | string | null
    jobType?: StringNullableFilter<"RFP"> | string | null
    images?: JsonNullableFilter<"RFP">
    attributes?: JsonNullableFilter<"RFP">
    originalCompany?: StringNullableFilter<"RFP"> | string | null
    status?: IntNullableFilter<"RFP"> | number | null
    startDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    bidsDueDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    emailList?: StringNullableListFilter<"RFP">
    emailGroupId?: IntNullableFilter<"RFP"> | number | null
    title?: StringNullableFilter<"RFP"> | string | null
    User?: StringNullableFilter<"RFP"> | string | null
    createdAt?: DateTimeFilter<"RFP"> | Date | string
    updatedAt?: DateTimeFilter<"RFP"> | Date | string
    emailGroup?: XOR<EmailGroupNullableScalarRelationFilter, EmailGroupWhereInput> | null
    jobs?: JobListRelationFilter
    bids?: BidListRelationFilter
  }

  export type RFPOrderByWithRelationInput = {
    id?: SortOrder
    currentBids?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    originalCompany?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    bidsDueDate?: SortOrderInput | SortOrder
    emailList?: SortOrder
    emailGroupId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    User?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    emailGroup?: EmailGroupOrderByWithRelationInput
    jobs?: JobOrderByRelationAggregateInput
    bids?: BidOrderByRelationAggregateInput
  }

  export type RFPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RFPWhereInput | RFPWhereInput[]
    OR?: RFPWhereInput[]
    NOT?: RFPWhereInput | RFPWhereInput[]
    currentBids?: IntNullableFilter<"RFP"> | number | null
    description?: StringNullableFilter<"RFP"> | string | null
    jobType?: StringNullableFilter<"RFP"> | string | null
    images?: JsonNullableFilter<"RFP">
    attributes?: JsonNullableFilter<"RFP">
    originalCompany?: StringNullableFilter<"RFP"> | string | null
    status?: IntNullableFilter<"RFP"> | number | null
    startDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    bidsDueDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    emailList?: StringNullableListFilter<"RFP">
    emailGroupId?: IntNullableFilter<"RFP"> | number | null
    title?: StringNullableFilter<"RFP"> | string | null
    User?: StringNullableFilter<"RFP"> | string | null
    createdAt?: DateTimeFilter<"RFP"> | Date | string
    updatedAt?: DateTimeFilter<"RFP"> | Date | string
    emailGroup?: XOR<EmailGroupNullableScalarRelationFilter, EmailGroupWhereInput> | null
    jobs?: JobListRelationFilter
    bids?: BidListRelationFilter
  }, "id">

  export type RFPOrderByWithAggregationInput = {
    id?: SortOrder
    currentBids?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    attributes?: SortOrderInput | SortOrder
    originalCompany?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    bidsDueDate?: SortOrderInput | SortOrder
    emailList?: SortOrder
    emailGroupId?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    User?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RFPCountOrderByAggregateInput
    _avg?: RFPAvgOrderByAggregateInput
    _max?: RFPMaxOrderByAggregateInput
    _min?: RFPMinOrderByAggregateInput
    _sum?: RFPSumOrderByAggregateInput
  }

  export type RFPScalarWhereWithAggregatesInput = {
    AND?: RFPScalarWhereWithAggregatesInput | RFPScalarWhereWithAggregatesInput[]
    OR?: RFPScalarWhereWithAggregatesInput[]
    NOT?: RFPScalarWhereWithAggregatesInput | RFPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RFP"> | number
    currentBids?: IntNullableWithAggregatesFilter<"RFP"> | number | null
    description?: StringNullableWithAggregatesFilter<"RFP"> | string | null
    jobType?: StringNullableWithAggregatesFilter<"RFP"> | string | null
    images?: JsonNullableWithAggregatesFilter<"RFP">
    attributes?: JsonNullableWithAggregatesFilter<"RFP">
    originalCompany?: StringNullableWithAggregatesFilter<"RFP"> | string | null
    status?: IntNullableWithAggregatesFilter<"RFP"> | number | null
    startDate?: DateTimeNullableWithAggregatesFilter<"RFP"> | Date | string | null
    bidsDueDate?: DateTimeNullableWithAggregatesFilter<"RFP"> | Date | string | null
    emailList?: StringNullableListFilter<"RFP">
    emailGroupId?: IntNullableWithAggregatesFilter<"RFP"> | number | null
    title?: StringNullableWithAggregatesFilter<"RFP"> | string | null
    User?: StringNullableWithAggregatesFilter<"RFP"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RFP"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RFP"> | Date | string
  }

  export type EmailGroupWhereInput = {
    AND?: EmailGroupWhereInput | EmailGroupWhereInput[]
    OR?: EmailGroupWhereInput[]
    NOT?: EmailGroupWhereInput | EmailGroupWhereInput[]
    id?: IntFilter<"EmailGroup"> | number
    name?: StringFilter<"EmailGroup"> | string
    company?: StringNullableFilter<"EmailGroup"> | string | null
    emails?: StringNullableListFilter<"EmailGroup">
    createdAt?: DateTimeFilter<"EmailGroup"> | Date | string
    updatedAt?: DateTimeFilter<"EmailGroup"> | Date | string
    rfps?: RFPListRelationFilter
  }

  export type EmailGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrderInput | SortOrder
    emails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rfps?: RFPOrderByRelationAggregateInput
  }

  export type EmailGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EmailGroupWhereInput | EmailGroupWhereInput[]
    OR?: EmailGroupWhereInput[]
    NOT?: EmailGroupWhereInput | EmailGroupWhereInput[]
    name?: StringFilter<"EmailGroup"> | string
    company?: StringNullableFilter<"EmailGroup"> | string | null
    emails?: StringNullableListFilter<"EmailGroup">
    createdAt?: DateTimeFilter<"EmailGroup"> | Date | string
    updatedAt?: DateTimeFilter<"EmailGroup"> | Date | string
    rfps?: RFPListRelationFilter
  }, "id">

  export type EmailGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrderInput | SortOrder
    emails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmailGroupCountOrderByAggregateInput
    _avg?: EmailGroupAvgOrderByAggregateInput
    _max?: EmailGroupMaxOrderByAggregateInput
    _min?: EmailGroupMinOrderByAggregateInput
    _sum?: EmailGroupSumOrderByAggregateInput
  }

  export type EmailGroupScalarWhereWithAggregatesInput = {
    AND?: EmailGroupScalarWhereWithAggregatesInput | EmailGroupScalarWhereWithAggregatesInput[]
    OR?: EmailGroupScalarWhereWithAggregatesInput[]
    NOT?: EmailGroupScalarWhereWithAggregatesInput | EmailGroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EmailGroup"> | number
    name?: StringWithAggregatesFilter<"EmailGroup"> | string
    company?: StringNullableWithAggregatesFilter<"EmailGroup"> | string | null
    emails?: StringNullableListFilter<"EmailGroup">
    createdAt?: DateTimeWithAggregatesFilter<"EmailGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmailGroup"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: IntFilter<"Job"> | number
    title?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    rfpId?: IntNullableFilter<"Job"> | number | null
    jobType?: StringFilter<"Job"> | string
    startDate?: StringFilter<"Job"> | string
    daysExpected?: IntFilter<"Job"> | number
    company?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    rfp?: XOR<RFPNullableScalarRelationFilter, RFPWhereInput> | null
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrder
    rfpId?: SortOrderInput | SortOrder
    jobType?: SortOrder
    startDate?: SortOrder
    daysExpected?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rfp?: RFPOrderByWithRelationInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    title?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    rfpId?: IntNullableFilter<"Job"> | number | null
    jobType?: StringFilter<"Job"> | string
    startDate?: StringFilter<"Job"> | string
    daysExpected?: IntFilter<"Job"> | number
    company?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    rfp?: XOR<RFPNullableScalarRelationFilter, RFPWhereInput> | null
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrder
    rfpId?: SortOrderInput | SortOrder
    jobType?: SortOrder
    startDate?: SortOrder
    daysExpected?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Job"> | number
    title?: StringNullableWithAggregatesFilter<"Job"> | string | null
    description?: StringWithAggregatesFilter<"Job"> | string
    rfpId?: IntNullableWithAggregatesFilter<"Job"> | number | null
    jobType?: StringWithAggregatesFilter<"Job"> | string
    startDate?: StringWithAggregatesFilter<"Job"> | string
    daysExpected?: IntWithAggregatesFilter<"Job"> | number
    company?: StringWithAggregatesFilter<"Job"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
  }

  export type BidLineItemWhereInput = {
    AND?: BidLineItemWhereInput | BidLineItemWhereInput[]
    OR?: BidLineItemWhereInput[]
    NOT?: BidLineItemWhereInput | BidLineItemWhereInput[]
    id?: IntFilter<"BidLineItem"> | number
    bidId?: IntFilter<"BidLineItem"> | number
    description?: StringNullableFilter<"BidLineItem"> | string | null
    amount?: FloatFilter<"BidLineItem"> | number
    createdAt?: DateTimeFilter<"BidLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"BidLineItem"> | Date | string
    bid?: XOR<BidScalarRelationFilter, BidWhereInput>
  }

  export type BidLineItemOrderByWithRelationInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bid?: BidOrderByWithRelationInput
  }

  export type BidLineItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BidLineItemWhereInput | BidLineItemWhereInput[]
    OR?: BidLineItemWhereInput[]
    NOT?: BidLineItemWhereInput | BidLineItemWhereInput[]
    bidId?: IntFilter<"BidLineItem"> | number
    description?: StringNullableFilter<"BidLineItem"> | string | null
    amount?: FloatFilter<"BidLineItem"> | number
    createdAt?: DateTimeFilter<"BidLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"BidLineItem"> | Date | string
    bid?: XOR<BidScalarRelationFilter, BidWhereInput>
  }, "id">

  export type BidLineItemOrderByWithAggregationInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrderInput | SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BidLineItemCountOrderByAggregateInput
    _avg?: BidLineItemAvgOrderByAggregateInput
    _max?: BidLineItemMaxOrderByAggregateInput
    _min?: BidLineItemMinOrderByAggregateInput
    _sum?: BidLineItemSumOrderByAggregateInput
  }

  export type BidLineItemScalarWhereWithAggregatesInput = {
    AND?: BidLineItemScalarWhereWithAggregatesInput | BidLineItemScalarWhereWithAggregatesInput[]
    OR?: BidLineItemScalarWhereWithAggregatesInput[]
    NOT?: BidLineItemScalarWhereWithAggregatesInput | BidLineItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BidLineItem"> | number
    bidId?: IntWithAggregatesFilter<"BidLineItem"> | number
    description?: StringNullableWithAggregatesFilter<"BidLineItem"> | string | null
    amount?: FloatWithAggregatesFilter<"BidLineItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BidLineItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BidLineItem"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    companyId?: IntNullableFilter<"User"> | number | null
    passwordHash?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    verificationExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    isAdmin?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    verificationExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    verificationToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    companyId?: IntNullableFilter<"User"> | number | null
    passwordHash?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    verificationExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
  }, "id" | "email" | "verificationToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    companyId?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    isAdmin?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    verificationExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    companyId?: IntNullableWithAggregatesFilter<"User"> | number | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    verificationExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: IntFilter<"Company"> | number
    name?: StringNullableFilter<"Company"> | string | null
    type?: StringNullableFilter<"Company"> | string | null
    typeOfWork?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    typeOfWork?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringNullableFilter<"Company"> | string | null
    type?: StringNullableFilter<"Company"> | string | null
    typeOfWork?: StringNullableFilter<"Company"> | string | null
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
  }, "id">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    typeOfWork?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _avg?: CompanyAvgOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
    _sum?: CompanySumOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Company"> | number
    name?: StringNullableWithAggregatesFilter<"Company"> | string | null
    type?: StringNullableWithAggregatesFilter<"Company"> | string | null
    typeOfWork?: StringNullableWithAggregatesFilter<"Company"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type JobTypeWhereInput = {
    AND?: JobTypeWhereInput | JobTypeWhereInput[]
    OR?: JobTypeWhereInput[]
    NOT?: JobTypeWhereInput | JobTypeWhereInput[]
    id?: IntFilter<"JobType"> | number
    name?: StringFilter<"JobType"> | string
    createdAt?: DateTimeFilter<"JobType"> | Date | string
    updatedAt?: DateTimeFilter<"JobType"> | Date | string
  }

  export type JobTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: JobTypeWhereInput | JobTypeWhereInput[]
    OR?: JobTypeWhereInput[]
    NOT?: JobTypeWhereInput | JobTypeWhereInput[]
    createdAt?: DateTimeFilter<"JobType"> | Date | string
    updatedAt?: DateTimeFilter<"JobType"> | Date | string
  }, "id" | "name">

  export type JobTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JobTypeCountOrderByAggregateInput
    _avg?: JobTypeAvgOrderByAggregateInput
    _max?: JobTypeMaxOrderByAggregateInput
    _min?: JobTypeMinOrderByAggregateInput
    _sum?: JobTypeSumOrderByAggregateInput
  }

  export type JobTypeScalarWhereWithAggregatesInput = {
    AND?: JobTypeScalarWhereWithAggregatesInput | JobTypeScalarWhereWithAggregatesInput[]
    OR?: JobTypeScalarWhereWithAggregatesInput[]
    NOT?: JobTypeScalarWhereWithAggregatesInput | JobTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobType"> | number
    name?: StringWithAggregatesFilter<"JobType"> | string
    createdAt?: DateTimeWithAggregatesFilter<"JobType"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobType"> | Date | string
  }

  export type CompanyFinancialWhereInput = {
    AND?: CompanyFinancialWhereInput | CompanyFinancialWhereInput[]
    OR?: CompanyFinancialWhereInput[]
    NOT?: CompanyFinancialWhereInput | CompanyFinancialWhereInput[]
    id?: IntFilter<"CompanyFinancial"> | number
    routing?: IntFilter<"CompanyFinancial"> | number
    account?: IntFilter<"CompanyFinancial"> | number
  }

  export type CompanyFinancialOrderByWithRelationInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type CompanyFinancialWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyFinancialWhereInput | CompanyFinancialWhereInput[]
    OR?: CompanyFinancialWhereInput[]
    NOT?: CompanyFinancialWhereInput | CompanyFinancialWhereInput[]
    routing?: IntFilter<"CompanyFinancial"> | number
    account?: IntFilter<"CompanyFinancial"> | number
  }, "id">

  export type CompanyFinancialOrderByWithAggregationInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
    _count?: CompanyFinancialCountOrderByAggregateInput
    _avg?: CompanyFinancialAvgOrderByAggregateInput
    _max?: CompanyFinancialMaxOrderByAggregateInput
    _min?: CompanyFinancialMinOrderByAggregateInput
    _sum?: CompanyFinancialSumOrderByAggregateInput
  }

  export type CompanyFinancialScalarWhereWithAggregatesInput = {
    AND?: CompanyFinancialScalarWhereWithAggregatesInput | CompanyFinancialScalarWhereWithAggregatesInput[]
    OR?: CompanyFinancialScalarWhereWithAggregatesInput[]
    NOT?: CompanyFinancialScalarWhereWithAggregatesInput | CompanyFinancialScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CompanyFinancial"> | number
    routing?: IntWithAggregatesFilter<"CompanyFinancial"> | number
    account?: IntWithAggregatesFilter<"CompanyFinancial"> | number
  }

  export type BidCreateInput = {
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rfp?: RFPCreateNestedOneWithoutBidsInput
    postings?: BidPostingCreateNestedManyWithoutBidInput
    lineItems?: BidLineItemCreateNestedManyWithoutBidInput
  }

  export type BidUncheckedCreateInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    rfpId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postings?: BidPostingUncheckedCreateNestedManyWithoutBidInput
    lineItems?: BidLineItemUncheckedCreateNestedManyWithoutBidInput
  }

  export type BidUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfp?: RFPUpdateOneWithoutBidsNestedInput
    postings?: BidPostingUpdateManyWithoutBidNestedInput
    lineItems?: BidLineItemUpdateManyWithoutBidNestedInput
  }

  export type BidUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postings?: BidPostingUncheckedUpdateManyWithoutBidNestedInput
    lineItems?: BidLineItemUncheckedUpdateManyWithoutBidNestedInput
  }

  export type BidCreateManyInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    rfpId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidPostingCreateInput = {
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bid: BidCreateNestedOneWithoutPostingsInput
  }

  export type BidPostingUncheckedCreateInput = {
    id?: number
    bidId: number
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidPostingUpdateInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bid?: BidUpdateOneRequiredWithoutPostingsNestedInput
  }

  export type BidPostingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bidId?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidPostingCreateManyInput = {
    id?: number
    bidId: number
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidPostingUpdateManyMutationInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidPostingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bidId?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RFPCreateInput = {
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailGroup?: EmailGroupCreateNestedOneWithoutRfpsInput
    jobs?: JobCreateNestedManyWithoutRfpInput
    bids?: BidCreateNestedManyWithoutRfpInput
  }

  export type RFPUncheckedCreateInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    emailGroupId?: number | null
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutRfpInput
    bids?: BidUncheckedCreateNestedManyWithoutRfpInput
  }

  export type RFPUpdateInput = {
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailGroup?: EmailGroupUpdateOneWithoutRfpsNestedInput
    jobs?: JobUpdateManyWithoutRfpNestedInput
    bids?: BidUpdateManyWithoutRfpNestedInput
  }

  export type RFPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    emailGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutRfpNestedInput
    bids?: BidUncheckedUpdateManyWithoutRfpNestedInput
  }

  export type RFPCreateManyInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    emailGroupId?: number | null
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RFPUpdateManyMutationInput = {
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RFPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    emailGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailGroupCreateInput = {
    name: string
    company?: string | null
    emails?: EmailGroupCreateemailsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    rfps?: RFPCreateNestedManyWithoutEmailGroupInput
  }

  export type EmailGroupUncheckedCreateInput = {
    id?: number
    name: string
    company?: string | null
    emails?: EmailGroupCreateemailsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    rfps?: RFPUncheckedCreateNestedManyWithoutEmailGroupInput
  }

  export type EmailGroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfps?: RFPUpdateManyWithoutEmailGroupNestedInput
  }

  export type EmailGroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfps?: RFPUncheckedUpdateManyWithoutEmailGroupNestedInput
  }

  export type EmailGroupCreateManyInput = {
    id?: number
    name: string
    company?: string | null
    emails?: EmailGroupCreateemailsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailGroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailGroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    title?: string | null
    description: string
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
    rfp?: RFPCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateInput = {
    id?: number
    title?: string | null
    description: string
    rfpId?: number | null
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfp?: RFPUpdateOneWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateManyInput = {
    id?: number
    title?: string | null
    description: string
    rfpId?: number | null
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemCreateInput = {
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    bid: BidCreateNestedOneWithoutLineItemsInput
  }

  export type BidLineItemUncheckedCreateInput = {
    id?: number
    bidId: number
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidLineItemUpdateInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bid?: BidUpdateOneRequiredWithoutLineItemsNestedInput
  }

  export type BidLineItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bidId?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemCreateManyInput = {
    id?: number
    bidId: number
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidLineItemUpdateManyMutationInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bidId?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company?: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    companyId?: number | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    companyId?: number | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    companyId?: NullableIntFieldUpdateOperationsInput | number | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    name?: string | null
    type?: string | null
    typeOfWork?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: number
    name?: string | null
    type?: string | null
    typeOfWork?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: number
    name?: string | null
    type?: string | null
    typeOfWork?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobTypeCreateInput = {
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobTypeUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobTypeCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyFinancialCreateInput = {
    routing: number
    account: number
  }

  export type CompanyFinancialUncheckedCreateInput = {
    id?: number
    routing: number
    account: number
  }

  export type CompanyFinancialUpdateInput = {
    routing?: IntFieldUpdateOperationsInput | number
    account?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyFinancialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    routing?: IntFieldUpdateOperationsInput | number
    account?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyFinancialCreateManyInput = {
    id?: number
    routing: number
    account: number
  }

  export type CompanyFinancialUpdateManyMutationInput = {
    routing?: IntFieldUpdateOperationsInput | number
    account?: IntFieldUpdateOperationsInput | number
  }

  export type CompanyFinancialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    routing?: IntFieldUpdateOperationsInput | number
    account?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type RFPNullableScalarRelationFilter = {
    is?: RFPWhereInput | null
    isNot?: RFPWhereInput | null
  }

  export type BidPostingListRelationFilter = {
    every?: BidPostingWhereInput
    some?: BidPostingWhereInput
    none?: BidPostingWhereInput
  }

  export type BidLineItemListRelationFilter = {
    every?: BidLineItemWhereInput
    some?: BidLineItemWhereInput
    none?: BidLineItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BidPostingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BidLineItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BidCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    approved?: SortOrder
    user?: SortOrder
    company?: SortOrder
    info?: SortOrder
    expectedDate?: SortOrder
    rfpId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    rfpId?: SortOrder
  }

  export type BidMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    approved?: SortOrder
    user?: SortOrder
    company?: SortOrder
    info?: SortOrder
    expectedDate?: SortOrder
    rfpId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    approved?: SortOrder
    user?: SortOrder
    company?: SortOrder
    info?: SortOrder
    expectedDate?: SortOrder
    rfpId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    rfpId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BidScalarRelationFilter = {
    is?: BidWhereInput
    isNot?: BidWhereInput
  }

  export type BidPostingCountOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    type?: SortOrder
    images?: SortOrder
    attributes?: SortOrder
    selectedOffer?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidPostingAvgOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    selectedOffer?: SortOrder
  }

  export type BidPostingMaxOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    type?: SortOrder
    selectedOffer?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidPostingMinOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    type?: SortOrder
    selectedOffer?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidPostingSumOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    selectedOffer?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EmailGroupNullableScalarRelationFilter = {
    is?: EmailGroupWhereInput | null
    isNot?: EmailGroupWhereInput | null
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type BidListRelationFilter = {
    every?: BidWhereInput
    some?: BidWhereInput
    none?: BidWhereInput
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BidOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RFPCountOrderByAggregateInput = {
    id?: SortOrder
    currentBids?: SortOrder
    description?: SortOrder
    jobType?: SortOrder
    images?: SortOrder
    attributes?: SortOrder
    originalCompany?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    bidsDueDate?: SortOrder
    emailList?: SortOrder
    emailGroupId?: SortOrder
    title?: SortOrder
    User?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RFPAvgOrderByAggregateInput = {
    id?: SortOrder
    currentBids?: SortOrder
    status?: SortOrder
    emailGroupId?: SortOrder
  }

  export type RFPMaxOrderByAggregateInput = {
    id?: SortOrder
    currentBids?: SortOrder
    description?: SortOrder
    jobType?: SortOrder
    originalCompany?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    bidsDueDate?: SortOrder
    emailGroupId?: SortOrder
    title?: SortOrder
    User?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RFPMinOrderByAggregateInput = {
    id?: SortOrder
    currentBids?: SortOrder
    description?: SortOrder
    jobType?: SortOrder
    originalCompany?: SortOrder
    status?: SortOrder
    startDate?: SortOrder
    bidsDueDate?: SortOrder
    emailGroupId?: SortOrder
    title?: SortOrder
    User?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RFPSumOrderByAggregateInput = {
    id?: SortOrder
    currentBids?: SortOrder
    status?: SortOrder
    emailGroupId?: SortOrder
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

  export type RFPListRelationFilter = {
    every?: RFPWhereInput
    some?: RFPWhereInput
    none?: RFPWhereInput
  }

  export type RFPOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmailGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    emails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailGroupAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmailGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmailGroupSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rfpId?: SortOrder
    jobType?: SortOrder
    startDate?: SortOrder
    daysExpected?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    id?: SortOrder
    rfpId?: SortOrder
    daysExpected?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rfpId?: SortOrder
    jobType?: SortOrder
    startDate?: SortOrder
    daysExpected?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    rfpId?: SortOrder
    jobType?: SortOrder
    startDate?: SortOrder
    daysExpected?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    id?: SortOrder
    rfpId?: SortOrder
    daysExpected?: SortOrder
  }

  export type BidLineItemCountOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidLineItemAvgOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    amount?: SortOrder
  }

  export type BidLineItemMaxOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidLineItemMinOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BidLineItemSumOrderByAggregateInput = {
    id?: SortOrder
    bidId?: SortOrder
    amount?: SortOrder
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    companyId?: SortOrder
    passwordHash?: SortOrder
    isAdmin?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    verificationExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    companyId?: SortOrder
    passwordHash?: SortOrder
    isAdmin?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    verificationExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    companyId?: SortOrder
    passwordHash?: SortOrder
    isAdmin?: SortOrder
    emailVerified?: SortOrder
    verificationToken?: SortOrder
    verificationExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    typeOfWork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    typeOfWork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    typeOfWork?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JobTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JobTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JobTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyFinancialCountOrderByAggregateInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type CompanyFinancialAvgOrderByAggregateInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type CompanyFinancialMaxOrderByAggregateInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type CompanyFinancialMinOrderByAggregateInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type CompanyFinancialSumOrderByAggregateInput = {
    id?: SortOrder
    routing?: SortOrder
    account?: SortOrder
  }

  export type RFPCreateNestedOneWithoutBidsInput = {
    create?: XOR<RFPCreateWithoutBidsInput, RFPUncheckedCreateWithoutBidsInput>
    connectOrCreate?: RFPCreateOrConnectWithoutBidsInput
    connect?: RFPWhereUniqueInput
  }

  export type BidPostingCreateNestedManyWithoutBidInput = {
    create?: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput> | BidPostingCreateWithoutBidInput[] | BidPostingUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidPostingCreateOrConnectWithoutBidInput | BidPostingCreateOrConnectWithoutBidInput[]
    createMany?: BidPostingCreateManyBidInputEnvelope
    connect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
  }

  export type BidLineItemCreateNestedManyWithoutBidInput = {
    create?: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput> | BidLineItemCreateWithoutBidInput[] | BidLineItemUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidLineItemCreateOrConnectWithoutBidInput | BidLineItemCreateOrConnectWithoutBidInput[]
    createMany?: BidLineItemCreateManyBidInputEnvelope
    connect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
  }

  export type BidPostingUncheckedCreateNestedManyWithoutBidInput = {
    create?: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput> | BidPostingCreateWithoutBidInput[] | BidPostingUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidPostingCreateOrConnectWithoutBidInput | BidPostingCreateOrConnectWithoutBidInput[]
    createMany?: BidPostingCreateManyBidInputEnvelope
    connect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
  }

  export type BidLineItemUncheckedCreateNestedManyWithoutBidInput = {
    create?: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput> | BidLineItemCreateWithoutBidInput[] | BidLineItemUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidLineItemCreateOrConnectWithoutBidInput | BidLineItemCreateOrConnectWithoutBidInput[]
    createMany?: BidLineItemCreateManyBidInputEnvelope
    connect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RFPUpdateOneWithoutBidsNestedInput = {
    create?: XOR<RFPCreateWithoutBidsInput, RFPUncheckedCreateWithoutBidsInput>
    connectOrCreate?: RFPCreateOrConnectWithoutBidsInput
    upsert?: RFPUpsertWithoutBidsInput
    disconnect?: RFPWhereInput | boolean
    delete?: RFPWhereInput | boolean
    connect?: RFPWhereUniqueInput
    update?: XOR<XOR<RFPUpdateToOneWithWhereWithoutBidsInput, RFPUpdateWithoutBidsInput>, RFPUncheckedUpdateWithoutBidsInput>
  }

  export type BidPostingUpdateManyWithoutBidNestedInput = {
    create?: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput> | BidPostingCreateWithoutBidInput[] | BidPostingUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidPostingCreateOrConnectWithoutBidInput | BidPostingCreateOrConnectWithoutBidInput[]
    upsert?: BidPostingUpsertWithWhereUniqueWithoutBidInput | BidPostingUpsertWithWhereUniqueWithoutBidInput[]
    createMany?: BidPostingCreateManyBidInputEnvelope
    set?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    disconnect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    delete?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    connect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    update?: BidPostingUpdateWithWhereUniqueWithoutBidInput | BidPostingUpdateWithWhereUniqueWithoutBidInput[]
    updateMany?: BidPostingUpdateManyWithWhereWithoutBidInput | BidPostingUpdateManyWithWhereWithoutBidInput[]
    deleteMany?: BidPostingScalarWhereInput | BidPostingScalarWhereInput[]
  }

  export type BidLineItemUpdateManyWithoutBidNestedInput = {
    create?: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput> | BidLineItemCreateWithoutBidInput[] | BidLineItemUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidLineItemCreateOrConnectWithoutBidInput | BidLineItemCreateOrConnectWithoutBidInput[]
    upsert?: BidLineItemUpsertWithWhereUniqueWithoutBidInput | BidLineItemUpsertWithWhereUniqueWithoutBidInput[]
    createMany?: BidLineItemCreateManyBidInputEnvelope
    set?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    disconnect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    delete?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    connect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    update?: BidLineItemUpdateWithWhereUniqueWithoutBidInput | BidLineItemUpdateWithWhereUniqueWithoutBidInput[]
    updateMany?: BidLineItemUpdateManyWithWhereWithoutBidInput | BidLineItemUpdateManyWithWhereWithoutBidInput[]
    deleteMany?: BidLineItemScalarWhereInput | BidLineItemScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BidPostingUncheckedUpdateManyWithoutBidNestedInput = {
    create?: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput> | BidPostingCreateWithoutBidInput[] | BidPostingUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidPostingCreateOrConnectWithoutBidInput | BidPostingCreateOrConnectWithoutBidInput[]
    upsert?: BidPostingUpsertWithWhereUniqueWithoutBidInput | BidPostingUpsertWithWhereUniqueWithoutBidInput[]
    createMany?: BidPostingCreateManyBidInputEnvelope
    set?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    disconnect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    delete?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    connect?: BidPostingWhereUniqueInput | BidPostingWhereUniqueInput[]
    update?: BidPostingUpdateWithWhereUniqueWithoutBidInput | BidPostingUpdateWithWhereUniqueWithoutBidInput[]
    updateMany?: BidPostingUpdateManyWithWhereWithoutBidInput | BidPostingUpdateManyWithWhereWithoutBidInput[]
    deleteMany?: BidPostingScalarWhereInput | BidPostingScalarWhereInput[]
  }

  export type BidLineItemUncheckedUpdateManyWithoutBidNestedInput = {
    create?: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput> | BidLineItemCreateWithoutBidInput[] | BidLineItemUncheckedCreateWithoutBidInput[]
    connectOrCreate?: BidLineItemCreateOrConnectWithoutBidInput | BidLineItemCreateOrConnectWithoutBidInput[]
    upsert?: BidLineItemUpsertWithWhereUniqueWithoutBidInput | BidLineItemUpsertWithWhereUniqueWithoutBidInput[]
    createMany?: BidLineItemCreateManyBidInputEnvelope
    set?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    disconnect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    delete?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    connect?: BidLineItemWhereUniqueInput | BidLineItemWhereUniqueInput[]
    update?: BidLineItemUpdateWithWhereUniqueWithoutBidInput | BidLineItemUpdateWithWhereUniqueWithoutBidInput[]
    updateMany?: BidLineItemUpdateManyWithWhereWithoutBidInput | BidLineItemUpdateManyWithWhereWithoutBidInput[]
    deleteMany?: BidLineItemScalarWhereInput | BidLineItemScalarWhereInput[]
  }

  export type BidCreateNestedOneWithoutPostingsInput = {
    create?: XOR<BidCreateWithoutPostingsInput, BidUncheckedCreateWithoutPostingsInput>
    connectOrCreate?: BidCreateOrConnectWithoutPostingsInput
    connect?: BidWhereUniqueInput
  }

  export type BidUpdateOneRequiredWithoutPostingsNestedInput = {
    create?: XOR<BidCreateWithoutPostingsInput, BidUncheckedCreateWithoutPostingsInput>
    connectOrCreate?: BidCreateOrConnectWithoutPostingsInput
    upsert?: BidUpsertWithoutPostingsInput
    connect?: BidWhereUniqueInput
    update?: XOR<XOR<BidUpdateToOneWithWhereWithoutPostingsInput, BidUpdateWithoutPostingsInput>, BidUncheckedUpdateWithoutPostingsInput>
  }

  export type RFPCreateemailListInput = {
    set: string[]
  }

  export type EmailGroupCreateNestedOneWithoutRfpsInput = {
    create?: XOR<EmailGroupCreateWithoutRfpsInput, EmailGroupUncheckedCreateWithoutRfpsInput>
    connectOrCreate?: EmailGroupCreateOrConnectWithoutRfpsInput
    connect?: EmailGroupWhereUniqueInput
  }

  export type JobCreateNestedManyWithoutRfpInput = {
    create?: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput> | JobCreateWithoutRfpInput[] | JobUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRfpInput | JobCreateOrConnectWithoutRfpInput[]
    createMany?: JobCreateManyRfpInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type BidCreateNestedManyWithoutRfpInput = {
    create?: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput> | BidCreateWithoutRfpInput[] | BidUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: BidCreateOrConnectWithoutRfpInput | BidCreateOrConnectWithoutRfpInput[]
    createMany?: BidCreateManyRfpInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutRfpInput = {
    create?: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput> | JobCreateWithoutRfpInput[] | JobUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRfpInput | JobCreateOrConnectWithoutRfpInput[]
    createMany?: JobCreateManyRfpInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type BidUncheckedCreateNestedManyWithoutRfpInput = {
    create?: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput> | BidCreateWithoutRfpInput[] | BidUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: BidCreateOrConnectWithoutRfpInput | BidCreateOrConnectWithoutRfpInput[]
    createMany?: BidCreateManyRfpInputEnvelope
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
  }

  export type RFPUpdateemailListInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EmailGroupUpdateOneWithoutRfpsNestedInput = {
    create?: XOR<EmailGroupCreateWithoutRfpsInput, EmailGroupUncheckedCreateWithoutRfpsInput>
    connectOrCreate?: EmailGroupCreateOrConnectWithoutRfpsInput
    upsert?: EmailGroupUpsertWithoutRfpsInput
    disconnect?: EmailGroupWhereInput | boolean
    delete?: EmailGroupWhereInput | boolean
    connect?: EmailGroupWhereUniqueInput
    update?: XOR<XOR<EmailGroupUpdateToOneWithWhereWithoutRfpsInput, EmailGroupUpdateWithoutRfpsInput>, EmailGroupUncheckedUpdateWithoutRfpsInput>
  }

  export type JobUpdateManyWithoutRfpNestedInput = {
    create?: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput> | JobCreateWithoutRfpInput[] | JobUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRfpInput | JobCreateOrConnectWithoutRfpInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutRfpInput | JobUpsertWithWhereUniqueWithoutRfpInput[]
    createMany?: JobCreateManyRfpInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutRfpInput | JobUpdateWithWhereUniqueWithoutRfpInput[]
    updateMany?: JobUpdateManyWithWhereWithoutRfpInput | JobUpdateManyWithWhereWithoutRfpInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type BidUpdateManyWithoutRfpNestedInput = {
    create?: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput> | BidCreateWithoutRfpInput[] | BidUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: BidCreateOrConnectWithoutRfpInput | BidCreateOrConnectWithoutRfpInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutRfpInput | BidUpsertWithWhereUniqueWithoutRfpInput[]
    createMany?: BidCreateManyRfpInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutRfpInput | BidUpdateWithWhereUniqueWithoutRfpInput[]
    updateMany?: BidUpdateManyWithWhereWithoutRfpInput | BidUpdateManyWithWhereWithoutRfpInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutRfpNestedInput = {
    create?: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput> | JobCreateWithoutRfpInput[] | JobUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRfpInput | JobCreateOrConnectWithoutRfpInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutRfpInput | JobUpsertWithWhereUniqueWithoutRfpInput[]
    createMany?: JobCreateManyRfpInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutRfpInput | JobUpdateWithWhereUniqueWithoutRfpInput[]
    updateMany?: JobUpdateManyWithWhereWithoutRfpInput | JobUpdateManyWithWhereWithoutRfpInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type BidUncheckedUpdateManyWithoutRfpNestedInput = {
    create?: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput> | BidCreateWithoutRfpInput[] | BidUncheckedCreateWithoutRfpInput[]
    connectOrCreate?: BidCreateOrConnectWithoutRfpInput | BidCreateOrConnectWithoutRfpInput[]
    upsert?: BidUpsertWithWhereUniqueWithoutRfpInput | BidUpsertWithWhereUniqueWithoutRfpInput[]
    createMany?: BidCreateManyRfpInputEnvelope
    set?: BidWhereUniqueInput | BidWhereUniqueInput[]
    disconnect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    delete?: BidWhereUniqueInput | BidWhereUniqueInput[]
    connect?: BidWhereUniqueInput | BidWhereUniqueInput[]
    update?: BidUpdateWithWhereUniqueWithoutRfpInput | BidUpdateWithWhereUniqueWithoutRfpInput[]
    updateMany?: BidUpdateManyWithWhereWithoutRfpInput | BidUpdateManyWithWhereWithoutRfpInput[]
    deleteMany?: BidScalarWhereInput | BidScalarWhereInput[]
  }

  export type EmailGroupCreateemailsInput = {
    set: string[]
  }

  export type RFPCreateNestedManyWithoutEmailGroupInput = {
    create?: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput> | RFPCreateWithoutEmailGroupInput[] | RFPUncheckedCreateWithoutEmailGroupInput[]
    connectOrCreate?: RFPCreateOrConnectWithoutEmailGroupInput | RFPCreateOrConnectWithoutEmailGroupInput[]
    createMany?: RFPCreateManyEmailGroupInputEnvelope
    connect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
  }

  export type RFPUncheckedCreateNestedManyWithoutEmailGroupInput = {
    create?: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput> | RFPCreateWithoutEmailGroupInput[] | RFPUncheckedCreateWithoutEmailGroupInput[]
    connectOrCreate?: RFPCreateOrConnectWithoutEmailGroupInput | RFPCreateOrConnectWithoutEmailGroupInput[]
    createMany?: RFPCreateManyEmailGroupInputEnvelope
    connect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EmailGroupUpdateemailsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RFPUpdateManyWithoutEmailGroupNestedInput = {
    create?: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput> | RFPCreateWithoutEmailGroupInput[] | RFPUncheckedCreateWithoutEmailGroupInput[]
    connectOrCreate?: RFPCreateOrConnectWithoutEmailGroupInput | RFPCreateOrConnectWithoutEmailGroupInput[]
    upsert?: RFPUpsertWithWhereUniqueWithoutEmailGroupInput | RFPUpsertWithWhereUniqueWithoutEmailGroupInput[]
    createMany?: RFPCreateManyEmailGroupInputEnvelope
    set?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    disconnect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    delete?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    connect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    update?: RFPUpdateWithWhereUniqueWithoutEmailGroupInput | RFPUpdateWithWhereUniqueWithoutEmailGroupInput[]
    updateMany?: RFPUpdateManyWithWhereWithoutEmailGroupInput | RFPUpdateManyWithWhereWithoutEmailGroupInput[]
    deleteMany?: RFPScalarWhereInput | RFPScalarWhereInput[]
  }

  export type RFPUncheckedUpdateManyWithoutEmailGroupNestedInput = {
    create?: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput> | RFPCreateWithoutEmailGroupInput[] | RFPUncheckedCreateWithoutEmailGroupInput[]
    connectOrCreate?: RFPCreateOrConnectWithoutEmailGroupInput | RFPCreateOrConnectWithoutEmailGroupInput[]
    upsert?: RFPUpsertWithWhereUniqueWithoutEmailGroupInput | RFPUpsertWithWhereUniqueWithoutEmailGroupInput[]
    createMany?: RFPCreateManyEmailGroupInputEnvelope
    set?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    disconnect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    delete?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    connect?: RFPWhereUniqueInput | RFPWhereUniqueInput[]
    update?: RFPUpdateWithWhereUniqueWithoutEmailGroupInput | RFPUpdateWithWhereUniqueWithoutEmailGroupInput[]
    updateMany?: RFPUpdateManyWithWhereWithoutEmailGroupInput | RFPUpdateManyWithWhereWithoutEmailGroupInput[]
    deleteMany?: RFPScalarWhereInput | RFPScalarWhereInput[]
  }

  export type RFPCreateNestedOneWithoutJobsInput = {
    create?: XOR<RFPCreateWithoutJobsInput, RFPUncheckedCreateWithoutJobsInput>
    connectOrCreate?: RFPCreateOrConnectWithoutJobsInput
    connect?: RFPWhereUniqueInput
  }

  export type RFPUpdateOneWithoutJobsNestedInput = {
    create?: XOR<RFPCreateWithoutJobsInput, RFPUncheckedCreateWithoutJobsInput>
    connectOrCreate?: RFPCreateOrConnectWithoutJobsInput
    upsert?: RFPUpsertWithoutJobsInput
    disconnect?: RFPWhereInput | boolean
    delete?: RFPWhereInput | boolean
    connect?: RFPWhereUniqueInput
    update?: XOR<XOR<RFPUpdateToOneWithWhereWithoutJobsInput, RFPUpdateWithoutJobsInput>, RFPUncheckedUpdateWithoutJobsInput>
  }

  export type BidCreateNestedOneWithoutLineItemsInput = {
    create?: XOR<BidCreateWithoutLineItemsInput, BidUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: BidCreateOrConnectWithoutLineItemsInput
    connect?: BidWhereUniqueInput
  }

  export type BidUpdateOneRequiredWithoutLineItemsNestedInput = {
    create?: XOR<BidCreateWithoutLineItemsInput, BidUncheckedCreateWithoutLineItemsInput>
    connectOrCreate?: BidCreateOrConnectWithoutLineItemsInput
    upsert?: BidUpsertWithoutLineItemsInput
    connect?: BidWhereUniqueInput
    update?: XOR<XOR<BidUpdateToOneWithWhereWithoutLineItemsInput, BidUpdateWithoutLineItemsInput>, BidUncheckedUpdateWithoutLineItemsInput>
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type CompanyUpdateOneWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type RFPCreateWithoutBidsInput = {
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailGroup?: EmailGroupCreateNestedOneWithoutRfpsInput
    jobs?: JobCreateNestedManyWithoutRfpInput
  }

  export type RFPUncheckedCreateWithoutBidsInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    emailGroupId?: number | null
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutRfpInput
  }

  export type RFPCreateOrConnectWithoutBidsInput = {
    where: RFPWhereUniqueInput
    create: XOR<RFPCreateWithoutBidsInput, RFPUncheckedCreateWithoutBidsInput>
  }

  export type BidPostingCreateWithoutBidInput = {
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidPostingUncheckedCreateWithoutBidInput = {
    id?: number
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidPostingCreateOrConnectWithoutBidInput = {
    where: BidPostingWhereUniqueInput
    create: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput>
  }

  export type BidPostingCreateManyBidInputEnvelope = {
    data: BidPostingCreateManyBidInput | BidPostingCreateManyBidInput[]
    skipDuplicates?: boolean
  }

  export type BidLineItemCreateWithoutBidInput = {
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidLineItemUncheckedCreateWithoutBidInput = {
    id?: number
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidLineItemCreateOrConnectWithoutBidInput = {
    where: BidLineItemWhereUniqueInput
    create: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput>
  }

  export type BidLineItemCreateManyBidInputEnvelope = {
    data: BidLineItemCreateManyBidInput | BidLineItemCreateManyBidInput[]
    skipDuplicates?: boolean
  }

  export type RFPUpsertWithoutBidsInput = {
    update: XOR<RFPUpdateWithoutBidsInput, RFPUncheckedUpdateWithoutBidsInput>
    create: XOR<RFPCreateWithoutBidsInput, RFPUncheckedCreateWithoutBidsInput>
    where?: RFPWhereInput
  }

  export type RFPUpdateToOneWithWhereWithoutBidsInput = {
    where?: RFPWhereInput
    data: XOR<RFPUpdateWithoutBidsInput, RFPUncheckedUpdateWithoutBidsInput>
  }

  export type RFPUpdateWithoutBidsInput = {
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailGroup?: EmailGroupUpdateOneWithoutRfpsNestedInput
    jobs?: JobUpdateManyWithoutRfpNestedInput
  }

  export type RFPUncheckedUpdateWithoutBidsInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    emailGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutRfpNestedInput
  }

  export type BidPostingUpsertWithWhereUniqueWithoutBidInput = {
    where: BidPostingWhereUniqueInput
    update: XOR<BidPostingUpdateWithoutBidInput, BidPostingUncheckedUpdateWithoutBidInput>
    create: XOR<BidPostingCreateWithoutBidInput, BidPostingUncheckedCreateWithoutBidInput>
  }

  export type BidPostingUpdateWithWhereUniqueWithoutBidInput = {
    where: BidPostingWhereUniqueInput
    data: XOR<BidPostingUpdateWithoutBidInput, BidPostingUncheckedUpdateWithoutBidInput>
  }

  export type BidPostingUpdateManyWithWhereWithoutBidInput = {
    where: BidPostingScalarWhereInput
    data: XOR<BidPostingUpdateManyMutationInput, BidPostingUncheckedUpdateManyWithoutBidInput>
  }

  export type BidPostingScalarWhereInput = {
    AND?: BidPostingScalarWhereInput | BidPostingScalarWhereInput[]
    OR?: BidPostingScalarWhereInput[]
    NOT?: BidPostingScalarWhereInput | BidPostingScalarWhereInput[]
    id?: IntFilter<"BidPosting"> | number
    bidId?: IntFilter<"BidPosting"> | number
    description?: StringNullableFilter<"BidPosting"> | string | null
    type?: StringNullableFilter<"BidPosting"> | string | null
    images?: JsonNullableFilter<"BidPosting">
    attributes?: JsonNullableFilter<"BidPosting">
    selectedOffer?: IntNullableFilter<"BidPosting"> | number | null
    company?: StringNullableFilter<"BidPosting"> | string | null
    createdAt?: DateTimeFilter<"BidPosting"> | Date | string
    updatedAt?: DateTimeFilter<"BidPosting"> | Date | string
  }

  export type BidLineItemUpsertWithWhereUniqueWithoutBidInput = {
    where: BidLineItemWhereUniqueInput
    update: XOR<BidLineItemUpdateWithoutBidInput, BidLineItemUncheckedUpdateWithoutBidInput>
    create: XOR<BidLineItemCreateWithoutBidInput, BidLineItemUncheckedCreateWithoutBidInput>
  }

  export type BidLineItemUpdateWithWhereUniqueWithoutBidInput = {
    where: BidLineItemWhereUniqueInput
    data: XOR<BidLineItemUpdateWithoutBidInput, BidLineItemUncheckedUpdateWithoutBidInput>
  }

  export type BidLineItemUpdateManyWithWhereWithoutBidInput = {
    where: BidLineItemScalarWhereInput
    data: XOR<BidLineItemUpdateManyMutationInput, BidLineItemUncheckedUpdateManyWithoutBidInput>
  }

  export type BidLineItemScalarWhereInput = {
    AND?: BidLineItemScalarWhereInput | BidLineItemScalarWhereInput[]
    OR?: BidLineItemScalarWhereInput[]
    NOT?: BidLineItemScalarWhereInput | BidLineItemScalarWhereInput[]
    id?: IntFilter<"BidLineItem"> | number
    bidId?: IntFilter<"BidLineItem"> | number
    description?: StringNullableFilter<"BidLineItem"> | string | null
    amount?: FloatFilter<"BidLineItem"> | number
    createdAt?: DateTimeFilter<"BidLineItem"> | Date | string
    updatedAt?: DateTimeFilter<"BidLineItem"> | Date | string
  }

  export type BidCreateWithoutPostingsInput = {
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rfp?: RFPCreateNestedOneWithoutBidsInput
    lineItems?: BidLineItemCreateNestedManyWithoutBidInput
  }

  export type BidUncheckedCreateWithoutPostingsInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    rfpId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lineItems?: BidLineItemUncheckedCreateNestedManyWithoutBidInput
  }

  export type BidCreateOrConnectWithoutPostingsInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutPostingsInput, BidUncheckedCreateWithoutPostingsInput>
  }

  export type BidUpsertWithoutPostingsInput = {
    update: XOR<BidUpdateWithoutPostingsInput, BidUncheckedUpdateWithoutPostingsInput>
    create: XOR<BidCreateWithoutPostingsInput, BidUncheckedCreateWithoutPostingsInput>
    where?: BidWhereInput
  }

  export type BidUpdateToOneWithWhereWithoutPostingsInput = {
    where?: BidWhereInput
    data: XOR<BidUpdateWithoutPostingsInput, BidUncheckedUpdateWithoutPostingsInput>
  }

  export type BidUpdateWithoutPostingsInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfp?: RFPUpdateOneWithoutBidsNestedInput
    lineItems?: BidLineItemUpdateManyWithoutBidNestedInput
  }

  export type BidUncheckedUpdateWithoutPostingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lineItems?: BidLineItemUncheckedUpdateManyWithoutBidNestedInput
  }

  export type EmailGroupCreateWithoutRfpsInput = {
    name: string
    company?: string | null
    emails?: EmailGroupCreateemailsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailGroupUncheckedCreateWithoutRfpsInput = {
    id?: number
    name: string
    company?: string | null
    emails?: EmailGroupCreateemailsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmailGroupCreateOrConnectWithoutRfpsInput = {
    where: EmailGroupWhereUniqueInput
    create: XOR<EmailGroupCreateWithoutRfpsInput, EmailGroupUncheckedCreateWithoutRfpsInput>
  }

  export type JobCreateWithoutRfpInput = {
    title?: string | null
    description: string
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUncheckedCreateWithoutRfpInput = {
    id?: number
    title?: string | null
    description: string
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateOrConnectWithoutRfpInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput>
  }

  export type JobCreateManyRfpInputEnvelope = {
    data: JobCreateManyRfpInput | JobCreateManyRfpInput[]
    skipDuplicates?: boolean
  }

  export type BidCreateWithoutRfpInput = {
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postings?: BidPostingCreateNestedManyWithoutBidInput
    lineItems?: BidLineItemCreateNestedManyWithoutBidInput
  }

  export type BidUncheckedCreateWithoutRfpInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postings?: BidPostingUncheckedCreateNestedManyWithoutBidInput
    lineItems?: BidLineItemUncheckedCreateNestedManyWithoutBidInput
  }

  export type BidCreateOrConnectWithoutRfpInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput>
  }

  export type BidCreateManyRfpInputEnvelope = {
    data: BidCreateManyRfpInput | BidCreateManyRfpInput[]
    skipDuplicates?: boolean
  }

  export type EmailGroupUpsertWithoutRfpsInput = {
    update: XOR<EmailGroupUpdateWithoutRfpsInput, EmailGroupUncheckedUpdateWithoutRfpsInput>
    create: XOR<EmailGroupCreateWithoutRfpsInput, EmailGroupUncheckedCreateWithoutRfpsInput>
    where?: EmailGroupWhereInput
  }

  export type EmailGroupUpdateToOneWithWhereWithoutRfpsInput = {
    where?: EmailGroupWhereInput
    data: XOR<EmailGroupUpdateWithoutRfpsInput, EmailGroupUncheckedUpdateWithoutRfpsInput>
  }

  export type EmailGroupUpdateWithoutRfpsInput = {
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailGroupUncheckedUpdateWithoutRfpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: EmailGroupUpdateemailsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutRfpInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutRfpInput, JobUncheckedUpdateWithoutRfpInput>
    create: XOR<JobCreateWithoutRfpInput, JobUncheckedCreateWithoutRfpInput>
  }

  export type JobUpdateWithWhereUniqueWithoutRfpInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutRfpInput, JobUncheckedUpdateWithoutRfpInput>
  }

  export type JobUpdateManyWithWhereWithoutRfpInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutRfpInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: IntFilter<"Job"> | number
    title?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    rfpId?: IntNullableFilter<"Job"> | number | null
    jobType?: StringFilter<"Job"> | string
    startDate?: StringFilter<"Job"> | string
    daysExpected?: IntFilter<"Job"> | number
    company?: StringFilter<"Job"> | string
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
  }

  export type BidUpsertWithWhereUniqueWithoutRfpInput = {
    where: BidWhereUniqueInput
    update: XOR<BidUpdateWithoutRfpInput, BidUncheckedUpdateWithoutRfpInput>
    create: XOR<BidCreateWithoutRfpInput, BidUncheckedCreateWithoutRfpInput>
  }

  export type BidUpdateWithWhereUniqueWithoutRfpInput = {
    where: BidWhereUniqueInput
    data: XOR<BidUpdateWithoutRfpInput, BidUncheckedUpdateWithoutRfpInput>
  }

  export type BidUpdateManyWithWhereWithoutRfpInput = {
    where: BidScalarWhereInput
    data: XOR<BidUpdateManyMutationInput, BidUncheckedUpdateManyWithoutRfpInput>
  }

  export type BidScalarWhereInput = {
    AND?: BidScalarWhereInput | BidScalarWhereInput[]
    OR?: BidScalarWhereInput[]
    NOT?: BidScalarWhereInput | BidScalarWhereInput[]
    id?: IntFilter<"Bid"> | number
    amount?: FloatFilter<"Bid"> | number
    approved?: BoolFilter<"Bid"> | boolean
    user?: StringNullableFilter<"Bid"> | string | null
    company?: StringNullableFilter<"Bid"> | string | null
    info?: StringNullableFilter<"Bid"> | string | null
    expectedDate?: DateTimeNullableFilter<"Bid"> | Date | string | null
    rfpId?: IntNullableFilter<"Bid"> | number | null
    createdAt?: DateTimeFilter<"Bid"> | Date | string
    updatedAt?: DateTimeFilter<"Bid"> | Date | string
  }

  export type RFPCreateWithoutEmailGroupInput = {
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutRfpInput
    bids?: BidCreateNestedManyWithoutRfpInput
  }

  export type RFPUncheckedCreateWithoutEmailGroupInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutRfpInput
    bids?: BidUncheckedCreateNestedManyWithoutRfpInput
  }

  export type RFPCreateOrConnectWithoutEmailGroupInput = {
    where: RFPWhereUniqueInput
    create: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput>
  }

  export type RFPCreateManyEmailGroupInputEnvelope = {
    data: RFPCreateManyEmailGroupInput | RFPCreateManyEmailGroupInput[]
    skipDuplicates?: boolean
  }

  export type RFPUpsertWithWhereUniqueWithoutEmailGroupInput = {
    where: RFPWhereUniqueInput
    update: XOR<RFPUpdateWithoutEmailGroupInput, RFPUncheckedUpdateWithoutEmailGroupInput>
    create: XOR<RFPCreateWithoutEmailGroupInput, RFPUncheckedCreateWithoutEmailGroupInput>
  }

  export type RFPUpdateWithWhereUniqueWithoutEmailGroupInput = {
    where: RFPWhereUniqueInput
    data: XOR<RFPUpdateWithoutEmailGroupInput, RFPUncheckedUpdateWithoutEmailGroupInput>
  }

  export type RFPUpdateManyWithWhereWithoutEmailGroupInput = {
    where: RFPScalarWhereInput
    data: XOR<RFPUpdateManyMutationInput, RFPUncheckedUpdateManyWithoutEmailGroupInput>
  }

  export type RFPScalarWhereInput = {
    AND?: RFPScalarWhereInput | RFPScalarWhereInput[]
    OR?: RFPScalarWhereInput[]
    NOT?: RFPScalarWhereInput | RFPScalarWhereInput[]
    id?: IntFilter<"RFP"> | number
    currentBids?: IntNullableFilter<"RFP"> | number | null
    description?: StringNullableFilter<"RFP"> | string | null
    jobType?: StringNullableFilter<"RFP"> | string | null
    images?: JsonNullableFilter<"RFP">
    attributes?: JsonNullableFilter<"RFP">
    originalCompany?: StringNullableFilter<"RFP"> | string | null
    status?: IntNullableFilter<"RFP"> | number | null
    startDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    bidsDueDate?: DateTimeNullableFilter<"RFP"> | Date | string | null
    emailList?: StringNullableListFilter<"RFP">
    emailGroupId?: IntNullableFilter<"RFP"> | number | null
    title?: StringNullableFilter<"RFP"> | string | null
    User?: StringNullableFilter<"RFP"> | string | null
    createdAt?: DateTimeFilter<"RFP"> | Date | string
    updatedAt?: DateTimeFilter<"RFP"> | Date | string
  }

  export type RFPCreateWithoutJobsInput = {
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    emailGroup?: EmailGroupCreateNestedOneWithoutRfpsInput
    bids?: BidCreateNestedManyWithoutRfpInput
  }

  export type RFPUncheckedCreateWithoutJobsInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    emailGroupId?: number | null
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bids?: BidUncheckedCreateNestedManyWithoutRfpInput
  }

  export type RFPCreateOrConnectWithoutJobsInput = {
    where: RFPWhereUniqueInput
    create: XOR<RFPCreateWithoutJobsInput, RFPUncheckedCreateWithoutJobsInput>
  }

  export type RFPUpsertWithoutJobsInput = {
    update: XOR<RFPUpdateWithoutJobsInput, RFPUncheckedUpdateWithoutJobsInput>
    create: XOR<RFPCreateWithoutJobsInput, RFPUncheckedCreateWithoutJobsInput>
    where?: RFPWhereInput
  }

  export type RFPUpdateToOneWithWhereWithoutJobsInput = {
    where?: RFPWhereInput
    data: XOR<RFPUpdateWithoutJobsInput, RFPUncheckedUpdateWithoutJobsInput>
  }

  export type RFPUpdateWithoutJobsInput = {
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    emailGroup?: EmailGroupUpdateOneWithoutRfpsNestedInput
    bids?: BidUpdateManyWithoutRfpNestedInput
  }

  export type RFPUncheckedUpdateWithoutJobsInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    emailGroupId?: NullableIntFieldUpdateOperationsInput | number | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bids?: BidUncheckedUpdateManyWithoutRfpNestedInput
  }

  export type BidCreateWithoutLineItemsInput = {
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    rfp?: RFPCreateNestedOneWithoutBidsInput
    postings?: BidPostingCreateNestedManyWithoutBidInput
  }

  export type BidUncheckedCreateWithoutLineItemsInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    rfpId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    postings?: BidPostingUncheckedCreateNestedManyWithoutBidInput
  }

  export type BidCreateOrConnectWithoutLineItemsInput = {
    where: BidWhereUniqueInput
    create: XOR<BidCreateWithoutLineItemsInput, BidUncheckedCreateWithoutLineItemsInput>
  }

  export type BidUpsertWithoutLineItemsInput = {
    update: XOR<BidUpdateWithoutLineItemsInput, BidUncheckedUpdateWithoutLineItemsInput>
    create: XOR<BidCreateWithoutLineItemsInput, BidUncheckedCreateWithoutLineItemsInput>
    where?: BidWhereInput
  }

  export type BidUpdateToOneWithWhereWithoutLineItemsInput = {
    where?: BidWhereInput
    data: XOR<BidUpdateWithoutLineItemsInput, BidUncheckedUpdateWithoutLineItemsInput>
  }

  export type BidUpdateWithoutLineItemsInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rfp?: RFPUpdateOneWithoutBidsNestedInput
    postings?: BidPostingUpdateManyWithoutBidNestedInput
  }

  export type BidUncheckedUpdateWithoutLineItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rfpId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postings?: BidPostingUncheckedUpdateManyWithoutBidNestedInput
  }

  export type CompanyCreateWithoutUsersInput = {
    name?: string | null
    type?: string | null
    typeOfWork?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: number
    name?: string | null
    type?: string | null
    typeOfWork?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    typeOfWork?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCompanyInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    companyId?: IntNullableFilter<"User"> | number | null
    passwordHash?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    verificationExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type BidPostingCreateManyBidInput = {
    id?: number
    description?: string | null
    type?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: number | null
    company?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidLineItemCreateManyBidInput = {
    id?: number
    description?: string | null
    amount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidPostingUpdateWithoutBidInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidPostingUncheckedUpdateWithoutBidInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidPostingUncheckedUpdateManyWithoutBidInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    selectedOffer?: NullableIntFieldUpdateOperationsInput | number | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemUpdateWithoutBidInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemUncheckedUpdateWithoutBidInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidLineItemUncheckedUpdateManyWithoutBidInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateManyRfpInput = {
    id?: number
    title?: string | null
    description: string
    jobType: string
    startDate: string
    daysExpected: number
    company: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BidCreateManyRfpInput = {
    id?: number
    amount: number
    approved?: boolean
    user?: string | null
    company?: string | null
    info?: string | null
    expectedDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateWithoutRfpInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateWithoutRfpInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUncheckedUpdateManyWithoutRfpInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    jobType?: StringFieldUpdateOperationsInput | string
    startDate?: StringFieldUpdateOperationsInput | string
    daysExpected?: IntFieldUpdateOperationsInput | number
    company?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BidUpdateWithoutRfpInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postings?: BidPostingUpdateManyWithoutBidNestedInput
    lineItems?: BidLineItemUpdateManyWithoutBidNestedInput
  }

  export type BidUncheckedUpdateWithoutRfpInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postings?: BidPostingUncheckedUpdateManyWithoutBidNestedInput
    lineItems?: BidLineItemUncheckedUpdateManyWithoutBidNestedInput
  }

  export type BidUncheckedUpdateManyWithoutRfpInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    approved?: BoolFieldUpdateOperationsInput | boolean
    user?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    info?: NullableStringFieldUpdateOperationsInput | string | null
    expectedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RFPCreateManyEmailGroupInput = {
    id?: number
    currentBids?: number | null
    description?: string | null
    jobType?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: string | null
    status?: number | null
    startDate?: Date | string | null
    bidsDueDate?: Date | string | null
    emailList?: RFPCreateemailListInput | string[]
    title?: string | null
    User?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RFPUpdateWithoutEmailGroupInput = {
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutRfpNestedInput
    bids?: BidUpdateManyWithoutRfpNestedInput
  }

  export type RFPUncheckedUpdateWithoutEmailGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutRfpNestedInput
    bids?: BidUncheckedUpdateManyWithoutRfpNestedInput
  }

  export type RFPUncheckedUpdateManyWithoutEmailGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    currentBids?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    attributes?: NullableJsonNullValueInput | InputJsonValue
    originalCompany?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bidsDueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailList?: RFPUpdateemailListInput | string[]
    title?: NullableStringFieldUpdateOperationsInput | string | null
    User?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyCompanyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    passwordHash: string
    isAdmin?: boolean
    emailVerified?: boolean
    verificationToken?: string | null
    verificationExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    verificationExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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