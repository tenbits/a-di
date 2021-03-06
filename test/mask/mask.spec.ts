import { Di } from '../../src/Di'

declare var mask;
let di = null;

UTest({
    $before() {
        di = new Di;
        mask.Di.setResolver(di);
        mask.Module.clearCache();
    },
    $teardown() {
        mask.Module.clearCache();
    },
    'should register service'() {
        class Service {
            foo() {
                return 'LoremIpsum';
            }
        };
        di.registerType(Service).asSelf();

        var service = di.resolve(Service);
        is_(service, Service);
        eq_(service.foo(), 'LoremIpsum');

        mask.cfg('getScript', (path) => {
            return (new mask.class.Deferred()).resolve(Service);
        });
    },
    'should inject service'() {
        var template = `
			import * as Service from 'fooService.js';
			define Test (service: Service) {
				h4 > '~[service.foo()]'
			}
			Test;
		`;

        return mask
            .renderAsync(template)
            .then(dom => {
                return UTest.domtest(dom, `
					find (h4) > text LoremIpsum;
				`);
            });
    }
})