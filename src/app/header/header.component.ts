import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes//store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    collapsed: boolean = true;

    collapsedStateChange() {
        this.collapsed = !this.collapsed;
    }

    constructor(
        private store: Store<fromApp.AppState>
        ) {}

    onSaveData() {
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    onFetchData() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnInit() {
        this.userSub = this.store.select('auth')
            .pipe(
                map(authState => {
                    return authState.user;
                })
            )
            .subscribe(user => {
                this.isAuthenticated = !!user;
            });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}