import { ResendClient } from "src/data/clients/mail";
import { Resend } from "resend";

export const makeResendClient = (): ResendClient => {
    return new ResendClient(new Resend());
}