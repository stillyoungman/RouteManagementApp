import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';

import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { LayoutTopbarComponent } from './layout-topbar/layout-topbar.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';

import { MaterialModule } from './shared-modules/material/material.module';
import { GeneralModule } from './shared-modules/general/general.module';

import { RouteStorageService } from './core/services/route-storage.service';
import { MapService } from './core/services/map.service';

//map-components
import { ChipComponent } from './map-components/chip/chip.component';
import { ChipPointComponent } from './map-components/chip-point/chip-point.component';
import { ChipSegmentComponent } from './map-components/chip-segment/chip-segment.component';
import { MapOptionsComponent } from './map-components/map-options/map-options.component';
import { RouteElementsComponent } from './map-components/route-elements/route-elements.component';
import { ElementCardComponent } from './map-components/element-card/element-card.component';
import { SegmentFillerComponent } from './map-components/fillers/segment-filler/segment-filler.component';
import { PointFillerComponent } from './map-components/fillers/point-filler/point-filler.component';
import { RouteFillerComponent } from './map-components/fillers/route-filler/route-filler.component';
import { RouteCardItemComponent } from './map-components/route-card-item/route-card-item.component';
import { RouteDetailsComponent } from './map-components/details/route-details/route-details.component';
import { PointDetailsComponent } from './map-components/details/point-details/point-details.component';
import { SegmentDetailsComponent } from './map-components/details/segment-details/segment-details.component';

//another-components
import { AuthCardComponent } from './another-components/auth-card/auth-card.component';

//pages
import { IndexComponent } from './pages/index/index.component';
import { CreateRouteComponent } from './pages/create-route/create-route.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { RouteComponent } from './pages/route/route.component';
import { MyRoutesComponent } from './pages/my-routes/my-routes.component';

import { TestAreaComponent } from './test-area/test-area.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NamePipe } from './core/helpers/name.pipe';
import { LoggedInGuard } from './core/helpers/loggedInGuard';
import { ToIndex } from './core/helpers/toIndex';
import { ShorterPipe } from './core/helpers/shorter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LayoutWrapperComponent,
    LayoutTopbarComponent,
    LayoutContentComponent,
    CreateRouteComponent,
    ChipComponent,
    TestAreaComponent,
    MapOptionsComponent,
    RouteElementsComponent,
    ChipPointComponent,
    ChipSegmentComponent,
    ElementCardComponent,
    SegmentFillerComponent,
    PointFillerComponent,
    RouteFillerComponent,
    IndexComponent,
    LoginComponent,
    CreateAccountComponent,
    NamePipe,
    AuthCardComponent,
    MyRoutesComponent,
    RouteCardItemComponent,
    RouteComponent,
    RouteDetailsComponent,
    PointDetailsComponent,
    SegmentDetailsComponent,
    ShorterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpModule,
    GeneralModule
  ],
  providers: [
    RouteStorageService,
    MapService,
    LoggedInGuard,
    ToIndex
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
