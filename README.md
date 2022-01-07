# Mongest Resolver for ra-data-graphql-simple (BETA)

### Automatic ReactAdmin GraphQL resolver

This is a BETA, and therefore you may encounter bugs. Please [post an issue](https://github.com/OoDeLally/ra-data-graphql-simple-mongest-resolver/issues) if needed.

## TL;DR

# Setup

Install (if not already there) the peer dependencies:

```bash
npm install @nestjs/mongoose
npm install mongodb
npm install mongoose
```

Then install the `ra-data-graphql-simple-mongest-resolver` lib:

```bash
npm install ra-data-graphql-simple-mongest-resolver
```

Now you can create your entity, your service, and your resolver:

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



## Roadmap

* Find what to export from mongest-service.
* Tests.
* Args options to make some field optional
