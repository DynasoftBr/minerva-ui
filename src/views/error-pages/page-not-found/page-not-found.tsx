import { Component, Vue } from "vue-property-decorator";
import ContentWrapper from "@/components/core/content-wrapper/content-wrapper";
import ContentContainer from "@/components/core/content-wrapper/content-container/content-container";
import Heading from "@/components/ui-elements/heading/heading";
import ContentHeader from "@/components/core/content-header/content-header";
import "./page-not-found.scss";

@Component
export default class PageNotFound extends Vue {

    protected render(h: any) {
        return (
            <ContentWrapper class="page-not-found">
                <ContentContainer>
                    <ContentHeader subTitle="Page not found">404</ContentHeader>
                    <Heading size={2} class="text-warning error-title">404</Heading>
                    <Heading size={3} class="error-subtitle">
                        <i class="fa fa-exclamation-triangle text-warning"></i> Oops! Page not found.
                    </Heading>

                    <p>
                        We could not find the page you were looking for.
                        Meanwhile, you may <a href="/">return to dashboard</a>.
                    </p>
                </ContentContainer>
            </ContentWrapper>
        );
    }
}

