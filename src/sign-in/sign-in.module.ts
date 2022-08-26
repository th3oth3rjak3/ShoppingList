import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  declarations: [SignInRoutingModule.components],
  imports: [SignInRoutingModule, SharedModule],
})
export class SignInModule {}
