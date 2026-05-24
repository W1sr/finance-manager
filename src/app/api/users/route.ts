import { createUserSchema } from "@/modules/users/validators/create-user-schema";
import { CreateUserService } from "@/modules/users/services/create-user-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = createUserSchema.parse(body);

    const service = new CreateUserService();

    const user = await service.execute(data);

    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 400,
      },
    );
  }
}
