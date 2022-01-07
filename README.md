# Mongest (BETA)

### Delightfully-typed Mongoose-wrapper NestJS-service

This is a BETA, and therefore you may encounter bugs. Please [post an issue](https://github.com/OoDeLally/mongest/issues) if needed.

<!-- Note: If you happen to use GraphQL, use <FIXME> instead, which also includes resolver boilerplates. -->

## TL;DR

* NestJS Service that delicately wraps Mongoose methods for your favorite entities.
* All returned documents are leans, but casted as instance of their entity class.
* Amazing discriminator-based polymorphism!
* Precise and safe typing in and out for all mongoose functions (sensitive to projection!).


# Setup

Install (if not already there) the peer dependencies:

```bash
npm install @nestjs/mongoose
npm install mongodb
npm install mongoose
```

Then install the `mongest` lib:

```bash
npm install mongest
```

Now you can create your entity and your service:

```ts

@Schema()
export class Cat {
  @Prop({ required: true, type: String })
  name!: string;
}


@Injectable()
export class CatsService extends MongestService(Cat) {}

// or...

@Injectable()
export class CatsService extends MongestService(Cat) {
  constructor(@InjectModel(Cat.name) public model: Model<Cat>) {
    // If you ever need to override the constructor (e.g. to add additional dependencies),
    // dont forget to explicitely inject the model to super().
    super(model);
  }
  async myCustomMethod(): Promise<Cat[]> {
    return await this.find({ name: 'pogo' });
  }
}

```


## Features

### Better method argument typing

Mongoose is often too lineant on what parameters are accepted (e.g. the `QueryOptions` god-object).

Mongest methods only accept options that are really supported by the mongo driver. In addition, pagination and sorting can be expressed in a more concise way.

```ts
const cats = await catService.find(
  { name: /pogo/i },
  {
    projection: { name: 1 },
    skip: 1,
    limit: 1,
    sort: { name: 1 }
  },
);
```


### Better method lean return typing

Mongoose return typing is often too constraining for no apparent good reason. It is also too linear when using projections.

Mongest documents are always **lean** instances of the entity class (except `aggregate()` method).

In addition, when a projection is used, the return type automatically excludes the non-projected fields, so that you will encounter a typing error if you try to use them by mistake.

```ts
const cat = await catService.findOne({ name: /pogo/i }, { projection: { name: 1 } });
if (cat) {
  const isCatInstance = cat instanceof Cat; // true
  const age = cats.age; // << TypeError: Property 'age' does not exist on type '{ name: string; _id: ObjectId; }'
}
```

### Polymorphism

If you use mongoose schema discriminators, Mongest will cast each document according to its type.

```ts
export enum CatKind {
  StrayCat = 'StrayCat',
  HomeCat = 'HomeCat',
}

@Schema({ discriminatorKey: 'kind' })
export class Cat {
  kind!: CatKind;

  @Prop({ required: true, type: String })
  name!: string;
}

@Schema()
export class StrayCat extends Cat {
  @Prop({ required: true, type: Number })
  territorySize!: number;
}

@Schema()
export class HomeCat extends Cat {
  @Prop({ required: true, type: String })
  humanSlave!: string;
}

const strayCat: StrayCat = { name: 'Billy', kind: 'StrayCat', territorySize: 45 }
const homeCat: HomeCat = { name: 'Pogo', kind: 'HomeCat', humanSlave: 'Pascal' }
await catService.insertMany([strayCat, homeCat])
const cat = await catService.find({});
for (const cat of cats) {
  cat // <= Type is Cat
  cat instanceof Cat; // true
  cat.name // <= Available for all cats.
  cat.kind // <= Available for all cats.
  if (cat instanceof StrayCat) {
    cat // <= Type is StrayCat
    cat.territorySize // <= Now available !
  }
  if (cat instanceof HomeCat) {
    cat // <= Type is HomeCat
    cat.humanSlave // <= Now available !
  }
}
```

### Polymorphism, projection, and typing

While TS will not let you use non-projected fields, under the hood the docs are still instances of their leaf class, so you can still cast them with `isEntityInstanceOf(...)`.

```ts
const strayCat: StrayCat = { name: 'Billy', kind: 'StrayCat', territorySize: 45 }
const homeCat: HomeCat = { name: 'Pogo', kind: 'HomeCat', humanSlave: 'Pascal' }
await catService.insertMany([strayCat, HomeCat])
const cats = await catService.find({}, { projection: { name: 1, territorySize: 1 } });
for (const cat of cats) {
  cat // <= Type is { name: string, territorySize: unknown }
  if (isEntityInstanceOf(cat, StrayCat)) {
    cat // <= Type is { name: 1, territorySize: number }
    cat.territorySize // <= number
  }
  if (isEntityInstanceOf(cat, HomeCat)) {
    cat // <= Type is { name: 1 }
    cat.humanSlave // <= Error (not projected)
  }
}
```

Note that it would still work with the vanilla `if (cat instanceof StrayCat)`, but you will lose the typing information about non-projected fields.


## Limitations

  * So far, only basic mongo projections are supported (e.g. `{foo: true, bar: true}`). More complex projections including specific logic are not.
  * Because lean documents are used systematically, things like virtual fields or `populate()` are not directly possible.
    Of course if you *really* need one of these fancy mongoose features, you can always invoke the model's methods directly (e.g. `service.model.findOne().populate('myRefField').exec()`).

